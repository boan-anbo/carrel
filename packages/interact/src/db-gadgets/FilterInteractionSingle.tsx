import {Select} from 'antd';
import React, {useEffect, useState} from 'react';
import {filterInteractions, getRecentInteractions} from "../clients/interact-db-client/filter-operations";
import {Interaction} from "../clients/grl-client/interact_db_client";
import {ValueType} from "tailwindcss/types/config";
import {LabeledValue} from "antd/lib/select";

const {Option} = Select;


export class SelectValue<T> {
    key?: string;
    label: string = '';
    value: string = '';
    data?: T;

    toLabelValue<T>(selectValue: SelectValue<Interaction>): LabeledValue {
        return {
            key: selectValue.key,
            label: <div className={'ring-emerald-200'}>{selectValue.label}</div>,
            value: this.value
        }
    }
}

async function fetch<T>(value: string, callback: (data: SelectValue<T>[]) => void) {

    // Get filtered interactions from backend
    let filteredData = await filterInteractions(value);
    let data = filteredData.map((interaction: Interaction, index) => {
        return {
            label: interaction.label,
            value: interaction.id.toString(),
            data: interaction
        } as SelectValue<T>;
    });
    // provide data to the callback
    console.log('providing data', data);
    callback(data);

};

export interface FilterInteractionSingleProps<T> {
    placeholder: string;
    style?: React.CSSProperties,
    onSelect: (value: SelectValue<T>) => void;
}

const FilterInteractionSingle: React.FC<FilterInteractionSingleProps<Interaction>> = (props) => {
    const [data, setData] = useState<SelectValue<Interaction>[]>([]);
    const [value, setValue] = useState<LabeledValue>();

    // on mount
    useEffect(() => {

        loadRecentInteractions();
    }, []);

    const loadRecentInteractions = async () => {

        console.log('attempting to fetch recent interactions');
        const recentInteractions = await getRecentInteractions();
        console.log('recent interactions', recentInteractions);
        setData(recentInteractions.map((interaction: Interaction, index) => {
            return {
                label: interaction.label,
                value: interaction.id.toString(),
                key: index.toString(),
                data: interaction
            } as SelectValue<Interaction>;
        }));
    }

    const handleSearch = (newValue: string) => {
        if (newValue) {
            fetch<Interaction>(newValue, setData);
        } else {
            setData([]);
        }
    };

    const handleChange = (newValue: number) => {
        console.log('Value changed in Filter Interaction', newValue);
        setValue({
            key: newValue.toString(),
            label: <div className={'ring-emerald-200'}>{newValue}</div>,
            value: newValue.toString()
        });
        const selectedInteraction = data.find((interaction: SelectValue<Interaction>) => interaction.value === newValue.toString());
        console.log('found selected interaction', data);
        if (selectedInteraction) {
            props.onSelect(selectedInteraction);
        }
    };

    const options = data.map((d, index) => <Option key={index} value={d.data?.id}>{d.value + ': ' + d.label}</Option>);

    return (
        <Select
            showSearch
            value={value ?? null}
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
