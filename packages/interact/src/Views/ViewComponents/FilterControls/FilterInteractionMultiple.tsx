import {Form, Popconfirm} from 'antd';
import {MultiSelect} from "@mantine/core";
import React, {KeyboardEvent, useEffect, useState} from 'react';
import {getFullInteractionById} from "../../../clients/interact-db-client/filter-operations";
import {Interaction, InteractionIdentity} from "../../../clients/grl-client/interact_db_client";
import {createInteractionEntity} from "../../../clients/interact-db-client/create-interaction-entity";
import {CreateRelationDto} from "../../InteractViews/CreatOrUpdateInteractionForm/FormComponents/CreateRelationDto";
import {LabeledValue} from "antd/lib/select";
import {fetchFilteredInteractionData} from "./FetchFilteredInteractionData";
import {IFilterInteractionMultipleProps} from "./IFilterInteractionMultipleProps";
import {SelectValue} from "./SelectValue";
import {getInteractionSelectionLabel} from "./filter-utils/getInteractionLabel";
import {Logger, LogSource} from "../../../utils/logger";
import {v4} from "uuid";

export interface MultiSelectValue<T> {
    label: string;
    value: string;
    data?: T |null ;
}

const FilterInteractionMultiple = (props: IFilterInteractionMultipleProps<Interaction>) => {
    const log = new Logger(LogSource.FilterInteractionMultiple);
    /**
     * Data for displayed options. Fetched from the backend as {@see Interaction}[], and converted to {@see SelectValue<Interaction>[]} for the Select component.
     */
    const [data, setData] = useState<MultiSelectValue<Interaction>[]>([]);
    const [selectedValues, setSelectedValues] = useState<string []>([]);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [currentSearchInput, setCurrentSearchInput] = useState<string>('');

    // on mount
    useEffect(() => {

        // load initial values
        fetchFilteredInteractionData('', setData, undefined, props.filterByEntityRelation);

        if (props.currentValueDtos) {
            loadInitialData();
        }

    }, [props.currentValueDtos]);


    const loadInitialData = async () => {
        const currentValueDtos: CreateRelationDto[] = props.currentValueDtos as CreateRelationDto[];
        const values: SelectValue<Interaction>[] = [];
        // await loop
        let index = 0;
        for await (const currentValueDto of currentValueDtos) {
            if (currentValueDto.linkedInteractionId) {
                const interaction = await getFullInteractionById(currentValueDto.linkedInteractionId);
                if (interaction) {
                    const interactionValue = new SelectValue<Interaction>(index, getInteractionSelectionLabel(interaction), interaction.id, interaction);
                    values.push(interactionValue);
                }
            }
            index++;
        }

        setData(values.map(selectValue => selectValue.toMultiSelectValue<Interaction>()));
        const latestValues: LabeledValue [] = values.map(value => value.toLabelValue());
        log.debug('Retranslated values', "retranslated values", latestValues);
        setSelectedValues(values.map(v => v.toValueString()));
    }

    // const handleSearch = (newValue: string) => {
    //     setCurrentSearchInput(newValue)
    //     if (newValue) {
    //         fetchFilteredInteractionData(newValue, setData, undefined, props.filterByEntityRelation);
    //         const fetchedList = data.filter(d => d.data !== undefined).map((d) => d.data as Interaction);
    //         if (fetchedList)
    //             props.onListFetched && props.onListFetched(fetchedList);
    //     } else {
    //         setData([]);
    //     }
    // };

    const handleChange = (selectedIds: string[]) => {
        log.debug('handleChange', 'labledValues', selectedIds);

        clearInputValue();
        // check duplicates

        // const  foundValue = data.map(i => data.find(d => d.value === i.value));
        setSelectedValues([...selectedIds]);
        const selectedValues = data.filter(d => selectedIds.includes(d.value)).map(d => d.data as Interaction);
        props.onSelect(selectedIds.map(i => SelectValue.fromMultiSelectValue<Interaction>(i)));
    };


    // // This is an important function that handles the creation of a new interaction entity
    // // When the user inputs a value, and presses enter, this function is called
    // // If enter is pressed again, the value is submitted to the backend, and emit created Interaction to upper component
    // // if the enter is pressed when the value is highlighted, ignore the Enter.
    // async function onSelectInputKeyDown(query: string) {
    //     setCurrentSearchInput(query);
    //     if (!showConfirm) {
    //         setShowConfirm(true);
    //     } else {
    //         // clear the search input
    //         clearInputValue();
    //         setShowConfirm(false);
    //         let interaction = await createInteractionEntity(query, props.createInteractionIdentity ?? InteractionIdentity.Entity);
    //         log.info('Interaction created on-the-go', 'Created interaction', interaction);
    //         addInteractionToOptionsAndSelection(interaction);
    //         console.log("Created interaction in filter control", interaction);
    //     }
    //
    //     return query;
    // }

    // clear input value, NOT the selections.
    function clearInputValue() {

        // clear the search input
        setCurrentSearchInput('');
    }


    /**
     * Add the newly selected/created/retrived interaction to the options pool and selection
     * @param interaction
     */
    function addInteractionToOptionsAndSelection(interaction: Interaction) {
        const selectionToAdd: SelectValue<Interaction> = SelectValue.fromInteraction(interaction);
        setData([...data, selectionToAdd.toMultiSelectValue()]);
        handleChange( [...selectedValues, selectionToAdd.toValueString()]);
    }

    return (
        <div>
            {/*{JSON.stringify(selectedValues)}*/}
            <div className={''}>
                {props.showLabel && <div>{props.label}</div>}
                <Form.Item>
                    <MultiSelect
                        searchable
                        value={selectedValues}
                        placeholder={props.placeholder}
                        style={props.style}
                        creatable
                        getCreateLabel={(query) => `Create new entity: ${query}`}
                        onCreate={(query) => {
                            const item = { value: query, label: query };
                            setData((current) => [...current, item]);
                            return item;
                        }}
                        onChange={handleChange}
                        data={data}>


                    </MultiSelect>
                </Form.Item>
            </div>
        </div>
    );
};

FilterInteractionMultiple.defaultProps = {
    placeholder: 'Select interactions',
    style: {width: '100%'},

    label: 'Filter interactions',
    showConfirm: false,
    onEntityCreated: (interaction: Interaction) => {
        console.log('onEntityCreated', interaction);
    },
    allowCreateNewEntity: true,
    createInteractionIdentity: InteractionIdentity.Entity,
    showLabel: true

} as IFilterInteractionMultipleProps<Interaction>


export default FilterInteractionMultiple;
