import {Select} from 'antd';
import React, {useState} from 'react';
import {filterInteractions} from "../clients/interact-db-client/filter-operations";
import {Interaction} from "../clients/grl-client/interact_db_client";
import {SelectValue} from './FilterInteractionSingle';

const {Option} = Select;


const fetch = async (value: string, callback: (data: { value: string; label: string }[]) => void) => {

    // Get filtered interactions from backend
    let filteredData = await filterInteractions(value);
    let data = filteredData.map((interaction: Interaction) => {
        return {
            label: interaction.label,
            value: interaction.uuid?.toString(),
            data: interaction
        } as SelectValue<Interaction>;
    });
    // provide data to the callback
    console.log('providing data', data);
    callback(data);

};

export interface FilterInteractionSingleProps<T> {
    placeholder: string;
    style: React.CSSProperties,
    onSelect: (value: SelectValue<T>[]) => void;
}

const FilterInteractionMultiple: React.FC<FilterInteractionSingleProps<Interaction>> = (props) => {
    const [data, setData] = useState<any[]>([]);
    const [value, setValue] = useState<string[]>();

    const handleSearch = (newValue: string) => {
        if (newValue) {
            fetch(newValue, setData);
        } else {
            setData([]);
        }
    };

    const handleChange = (newValue: string[]) => {
        setValue(newValue);
        props.onSelect(data.filter((d) => newValue.includes(d.value)));
    };

    const options = data.map((d, index) => <Option key={d.value}>{d.label}</Option>);

    function onSelectSelect() {

    }

    return (
        <Select
            mode="multiple"
            showSearch
            value={value}
            placeholder={props.placeholder}
            style={props.style}
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={false}
            onInputKeyDown={(e) => {
                if (e.key === 'Enter') {
                    console.log('onInputKeyDown', e.key);
                    const firstOption = data[1];
                    if (firstOption) {
                        handleChange((value || []).concat('123'));
                    }
                    // setValue()
                }
            }
            }
            allowClear={true}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
        >
            {options}
        </Select>
    );
};


export default FilterInteractionMultiple;
