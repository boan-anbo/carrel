import {Select} from 'antd';
import React, {useEffect, useState} from 'react';
import {filterInteractions, getRecentInteractions} from "../clients/interact-db-client/filter-operations";
import {Interaction} from "../clients/grl-client/interact_db_client";

const {Option} = Select;


export interface SelectValue<T> {
    key: string;
    label: string;
    value: string;
    data: T;
}

const fetch = async (value: string, callback: (data: { value: string; label: string }[]) => void) => {

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
    console.log('providing data', data);
    callback(data);

};

export interface FilterInteractionSingleProps<T> {
    placeholder: string;
    style: React.CSSProperties,
    onSelect: (value: SelectValue<T>) => void;
}

const FilterInteractionSingle: React.FC<FilterInteractionSingleProps<Interaction>> = (props) => {
    const [data, setData] = useState<any[]>([]);
    const [value, setValue] = useState<string>();

    // on mount
    useEffect(() => {

        loadRecentInteractions();
    }, []);

    const loadRecentInteractions = async () => {

        console.log('attempting to fetch recent interactions');
        const recentInteractions = await getRecentInteractions();
        console.log('recent interactions', recentInteractions);
        setData(recentInteractions.map((interaction: Interaction) => {
            return {
                label: interaction.label,
                value: interaction.id.toString(),
                data: interaction
            } as SelectValue<Interaction>;
        }));
    }

    const handleSearch = (newValue: string) => {
        if (newValue.length === 0) {
            loadRecentInteractions()
        }
        if (newValue) {
            fetch(newValue, setData);
        } else {
            setData([]);
        }
    };

    const handleChange = (newValue: string) => {
        setValue(newValue);
        props.onSelect(data.find((d) => d.value === newValue));
    };

    const options = data.map((d, index) => <Option key={d.value}>{d.value + ': ' + d.label}</Option>);

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


export default FilterInteractionSingle;
