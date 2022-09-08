import {Form, Popconfirm, Select} from 'antd';
import React, {KeyboardEvent, useEffect, useState} from 'react';
import {filterInteractionRelation, filterInteractions} from "../clients/interact-db-client/filter-operations";
import {Interaction, InteractionIdentity, Relation, RelationTypes} from "../clients/grl-client/interact_db_client";
import {SelectValue} from './FilterInteractionSingle';
import {createInteractionEntity} from "../clients/interact-db-client/create-interaction-entity";
import {FilterByEntityRelation} from "./FilterByEntityRelation";
import {SizeType} from "antd/lib/config-provider/SizeContext";
import {CreateRelationDto} from "../Views/InteractViews/CreatOrUpdateInteractionForm/CreateRelationDto";

const {Option} = Select;


const fetch = async (value: string, callback: (data: SelectValue<Interaction>[]) => void, filterByEntityRelation?: { hostId: number; relation: RelationTypes } | undefined) => {

    const shouldFilterByEntityRelation = filterByEntityRelation !== undefined;
    // Get filtered interactions from backend
    let filteredData: Interaction[];
    if (shouldFilterByEntityRelation) {
        console.log('filter by entity relation', filterByEntityRelation);
       const connection = await filterInteractionRelation(value, filterByEntityRelation);
        filteredData = connection.nodes?.map((relation: Relation) => relation.linkedInteraction as Interaction) ?? [];
    } else {
        filteredData = await filterInteractions(value);
        console.log('filter by interaction label');
    }
    let data = filteredData.map((interaction: Interaction) => {
        return {
            label: interaction.label,
            value: interaction.id.toString(),
            data: interaction
        } as SelectValue<Interaction>;
    });
    // provide data to the callback
    console.log('fetched data', data);
    callback(data);

};

export interface FilterInteractionMultipleProps<T> {
    placeholder: string;
    style?: React.CSSProperties,
    /// Array of number ids of selected interactions
    onSelect: (value: string[]) => void;
    label?: string;
    showConfirm?: boolean;
    onEntityCreated?: (interaction: Interaction) => void;
    allowCreateNewEntity?: boolean;
    onListFetched?: (interactions: Interaction[]) => void;
    createInteractionIdentity?: InteractionIdentity;
    // If this is provided, the filter will only query those interaction relations with the hostInteractionId and relationType
    filterByEntityRelation?: FilterByEntityRelation
    showLabel?: boolean;
    size?: SizeType | undefined;
    currentValueDtos?: CreateRelationDto[];
}

const FilterInteractionMultiple = (props: FilterInteractionMultipleProps<Interaction>) => {
    const [data, setData] = useState<SelectValue<Interaction>[]>([]);
    const [value, setValue] = useState<string[]>();
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [currentSearchInput, setCurrentSearchInput] = useState<string>('');

    // const isFilterByHostRelation = props.filterByEntityRelation !== undefined;



    // on mount
    useEffect(() => {

        // load initial values
            fetch('', setData, props.filterByEntityRelation);

                // load initial values
        setValue(props.currentValueDtos?.map(dto => dto.linkedInteractionId.toString()) ?? []);
    }, [props.currentValueDtos]);



    const handleSearch = (newValue: string) => {
        setCurrentSearchInput(newValue)
        if (newValue) {
            fetch(newValue, setData, props.filterByEntityRelation);
            props.onListFetched && props.onListFetched(data.map((d) => d.data));
        } else {
            setData([]);
        }
    };

    const handleChange = (selectedInteractionIds: string[]) => {
        setValue(selectedInteractionIds);
        props.onSelect(selectedInteractionIds);
    };

    const options = data.map((selectValue, index) => <Option
        key={selectValue.value}>{selectValue.value + ': ' + selectValue.label} </Option>);


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

        setData([...data, {
            label: interaction.label,
            value: interaction.id.toString(),
            data: interaction,
            key: interaction.id.toString()
        }])
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
                        {options}
                    </Select>
                </Form.Item>
            </div>
        </div>
    );
};

FilterInteractionMultiple.defaultProps = {
    placeholder: 'Select interactions',
    style: {width: '100%'},
    onSelect: (value: string[]) => {
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
} as FilterInteractionMultipleProps<Interaction>


export default FilterInteractionMultiple;
