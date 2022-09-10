import {Form, Popconfirm, Select} from 'antd';
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

const {Option} = Select;

const FilterInteractionMultiple = (props: IFilterInteractionMultipleProps<Interaction>) => {
    const log = new Logger(LogSource.FilterInteractionMultiple);
    /**
     * Data for displayed options. Fetched from the backend as {@see Interaction}[], and converted to {@see SelectValue<Interaction>[]} for the Select component.
     */
    const [data, setData] = useState<SelectValue<Interaction>[]>([]);
    const [selectedValues, setSelectedValues] = useState<LabeledValue []>([]);
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

        setData(values);
        const latestValues: LabeledValue [] = values.map(value => value.toLabelValue());
        log.debug('Retranslated values', "retranslated values", latestValues);
        setSelectedValues(values);
    }

    const handleSearch = (newValue: string) => {
        setCurrentSearchInput(newValue)
        if (newValue) {
            fetchFilteredInteractionData(newValue, setData, undefined, props.filterByEntityRelation);
            const fetchedList = data.filter(d => d.data !== undefined).map((d) => d.data as Interaction);
            if (fetchedList)
                props.onListFetched && props.onListFetched(fetchedList);
        } else {
            setData([]);
        }
    };

    const handleChange = (labledValues: LabeledValue[]) => {

        clearInputValue();
        // check duplicates

        setSelectedValues(labledValues);
        const data = labledValues.map((v, index) => SelectValue.fromLabelValue<Interaction>(v));
        props.onSelect(data);
    };


    // This is an important function that handles the creation of a new interaction entity
    // When the user inputs a value, and presses enter, this function is called
    // If enter is pressed again, the value is submitted to the backend, and emit created Interaction to upper component
    // if the enter is pressed when the value is highlighted, ignore the Enter.
    async function onSelectInputKeyDown(event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (event.key === 'Enter') {
            if (event.currentTarget.value.trim() === '') {
                return
            }
            setCurrentSearchInput(event.currentTarget.value);
            log.debug('onSelectInputKeyDown', 'event', event.currentTarget.value);
            if (!showConfirm) {
                setShowConfirm(true);
            } else {
                // clear the search input
                clearInputValue();
                setShowConfirm(false);
                let interaction = await createInteractionEntity(currentSearchInput, props.createInteractionIdentity ?? InteractionIdentity.Entity);
                log.info('Interaction created on-the-go', 'Created interaction', interaction);
                addInteraction(interaction);
                console.log("Created interaction in filter control", interaction);
            }
        }
        if (event.key === 'Escape') {
            setShowConfirm(false);
        }

    }

    // clear input value, NOT the selections.
    function clearInputValue() {

        // clear the search input
        setCurrentSearchInput('');
    }

    function onPopconfirmConfirm(e?: React.MouseEvent) {
        setShowConfirm(false);

    }

    function addInteraction(interaction: Interaction) {

        const selectValue: SelectValue<Interaction> = SelectValue.fromInteraction(interaction);

        setData([...data, selectValue]);
        const currentValues: LabeledValue[] = selectedValues ?? [];
        const newValues: LabeledValue[] = [...currentValues, selectValue.toLabelValue()];
        handleChange(newValues);
    }

    return (
        <div>
            {/*{JSON.stringify(selectedValues)}*/}
            <Popconfirm open={showConfirm}
                        onCancel={() => setShowConfirm(false)}
                        afterOpenChange={(e) => console.log('afterOpenChange', e)}
                        title={`Create new entity: ${currentSearchInput}`} onConfirm={onPopconfirmConfirm}
                        onOpenChange={() => console.log('open change')}>

            </Popconfirm>
            <div className={''}>
                {props.showLabel && <div>{props.label}</div>}
                <Form.Item>
                    <Select
                        mode="multiple"
                        showSearch
                        size={props.size}
                        labelInValue={true}
                        value={selectedValues}
                        placeholder={props.placeholder}
                        style={props.style}
                        defaultActiveFirstOption={false}
                        showArrow={true}
                        filterOption={false}
                        onInputKeyDown={onSelectInputKeyDown}
                        allowClear={true}
                        searchValue={currentSearchInput}
                        onSearch={handleSearch}
                        onChange={handleChange}
                    >

                        {data.map((option, index) => (
                            <Option
                                value={option.value}
                                data={option.data}
                                key={index}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
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
