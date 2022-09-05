import {Select} from 'antd';
import React, {useState} from 'react';
import {filterInteractions} from "../db-operations/filter-operations";
import {Interaction} from "../grl-client/interact_db_client";
import {SelectValue} from "./FilterInteractions";

const {Option} = Select;

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const fetch = async (value: string, callback: (data: { value: string; label: string }[]) => void) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    let filteredData = await filterInteractions(value);
    let data = filteredData.map((interaction: Interaction) => {
        return {
            label: interaction.label,
            value: interaction.uuid?.toString()
        } as SelectValue;
    });
    callback(data);

};

const SearchInput: React.FC<{ placeholder: string; style: React.CSSProperties }> = props => {
    const [data, setData] = useState<any[]>([]);
    const [value, setValue] = useState<string>();

    const handleSearch = (newValue: string) => {
        if (newValue) {
            fetch(newValue, setData);
        } else {
            setData([]);
        }
    };

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const options = data.map(d => <Option key={d.value}>{d.label}</Option>);

    return (
        <Select
            showSearch
            value={value}
            placeholder={props.placeholder}
            style={props.style}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
        >
            {options}
        </Select>
    );
};

const SearchAndSelectionInteraction = () =>
    <SearchInput placeholder="input search text" style={{width: 200}}/>;

export default SearchAndSelectionInteraction;
