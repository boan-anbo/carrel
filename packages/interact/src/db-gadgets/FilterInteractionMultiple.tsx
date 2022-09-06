import {Button, Form, Popconfirm, Select} from 'antd';
import React, {KeyboardEvent, useState} from 'react';
import {filterInteractions} from "../clients/interact-db-client/filter-operations";
import {Interaction} from "../clients/grl-client/interact_db_client";
import filterInteractionSingle, {SelectValue} from './FilterInteractionSingle';
import {createInteractionEntity} from "../clients/interact-db-client/create-interaction-entity";

const {Option} = Select;


const fetch = async (value: string, callback: (data: SelectValue<Interaction>[]) => void) => {

    // Get filtered interactions from backend
    let filteredData = await filterInteractions(value);
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
}

const FilterInteractionMultiple = (props: FilterInteractionMultipleProps<Interaction>) => {
    const [data, setData] = useState<SelectValue<Interaction>[]>([]);
    const [value, setValue] = useState<string[]>();
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [currentSearchInput, setCurrentSearchInput] = useState<string>('');

    const handleSearch = (newValue: string) => {
        setCurrentSearchInput(newValue)
        if (newValue) {
            fetch(newValue, setData);
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
                let interaction = await createInteractionEntity(currentSearchInput, '', '');
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
            <Form.Item label={props.label}>
                <Select
                    mode="multiple"
                    showSearch
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
} as FilterInteractionMultipleProps<Interaction>


export default FilterInteractionMultiple;
