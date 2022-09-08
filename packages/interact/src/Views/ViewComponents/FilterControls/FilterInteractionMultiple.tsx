import {Form, Popconfirm, Select} from 'antd';
import React, {KeyboardEvent, useEffect, useState} from 'react';
import {getFullInteractionById} from "../../../clients/interact-db-client/filter-operations";
import {Interaction, InteractionIdentity} from "../../../clients/grl-client/interact_db_client";
import {createInteractionEntity} from "../../../clients/interact-db-client/create-interaction-entity";
import {CreateRelationDto} from "../../InteractViews/CreatOrUpdateInteractionForm/CreateRelationDto";
import {LabeledValue} from "antd/lib/select";
import {fetchFilteredInteractionData} from "./FetchFilteredInteractionData";
import {IFilterInteractionMultipleProps} from "./IFilterInteractionMultipleProps";
import {SelectValue} from "./SelectValue";
import {getInteractionSelectionLabel} from "./filter-utils/getInteractionLabel";
import {EmittedLabledValue} from "./EmittedLabledValue";

const {Option} = Select;

const FilterInteractionMultiple = (props: IFilterInteractionMultipleProps<Interaction>) => {
    /**
     * Data for displayed options. Fetched from the backend as {@see Interaction}[], and converted to {@see SelectValue<Interaction>[]} for the Select component.
     */
    const [data, setData] = useState<SelectValue<Interaction>[]>([]);
    const [value, setValue] = useState<LabeledValue []>([]);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [currentSearchInput, setCurrentSearchInput] = useState<string>('');

    // on mount
    useEffect(() => {

        // load initial values
        fetchFilteredInteractionData('', setData, props.filterByEntityRelation);

        if (props.currentValueDtos) {
            loadInitialData();
        }

    }, []);


    const loadInitialData = async () => {
        console.log(' Multiple selected is loading initial data', props.currentValueDtos);
        const currentValueDtos: CreateRelationDto[] = props.currentValueDtos as CreateRelationDto[];
        const values: SelectValue<Interaction>[] = [];
        // await loop
        for await (const currentValueDto of currentValueDtos) {
            if (currentValueDto.linkedInteractionId) {
                const interaction = await getFullInteractionById(currentValueDto.linkedInteractionId);
                if (interaction) {
                    const interactionValue = new SelectValue(
                        interaction.id.toString(),
                        getInteractionSelectionLabel(interaction),
                        interaction.id,
                        interaction
                    );
                }
            }
        }
        setData(values);
        setValue(values.map(value => {
                return {
                    key: value.key,
                    label: value.label,
                    value: value.value
                }
            }
        ));
    }

    const handleSearch = (newValue: string) => {
        setCurrentSearchInput(newValue)
        if (newValue) {
            fetchFilteredInteractionData(newValue, setData, props.filterByEntityRelation);
            const fetchedList = data.filter(d => d.data !== undefined).map((d) => d.data as Interaction);
            if (fetchedList)
                props.onListFetched && props.onListFetched(fetchedList);
        } else {
            setData([]);
        }
    };

    const handleChange = (labledValues: any) => {
        console.warn('Value changed in Filter Interaction', labledValues);
        setValue(labledValues);
        props.onSelect(labledValues);
    };


    // This is an important function that handles the creation of a new interaction entity
    // When the user inputs a value, and presses enter, this function is called
    // If enter is pressed again, the value is submitted to the backend, and emit created Interaction to upper component
    async function onSelectInputKeyDown(event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (event.key === 'Enter') {
            setCurrentSearchInput(event.currentTarget.value);
            if (!showConfirm) {
                setShowConfirm(true);
            } else {
                // clear the search input
                setCurrentSearchInput('');
                setShowConfirm(false);
                let interaction = await createInteractionEntity(currentSearchInput, props.createInteractionIdentity ?? InteractionIdentity.Entity);
                addInteraction(interaction);
                console.log("Created interaction in filter control", interaction);
            }
            // console.log('onInputKeyDown', e.key);
            // const firstOption = data[1];
            // if (firstOption) {
            // }
            // setValue()
        }
        if (event.key === 'Escape') {
            setShowConfirm(false);
        }

    }

    function onPopconfirmConfirm(e?: React.MouseEvent) {

        // if (confirmCreateNewEntry) {
        //
        //     console.log('create new entry');
        //     const createdInteraction = await createInteractionEntity(event.currentTarget.value);
        // }
    }

    function addInteraction(interaction: Interaction) {

        const selectValue = SelectValue.fromInteraction(interaction);

        setData([...data, selectValue]);
        const currentValues = value ?? [];
        const newValues = [...currentValues, interaction.id.toString()];
        handleChange(newValues);
    }

    return (
        <div>
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
                        value={value}
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
                            <Option value={option.value} data={option.data} key={index}>
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
    onSelect: (value: EmittedLabledValue[]) => {
        console.log('onSelect', value);
    },
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
