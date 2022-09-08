import {Select} from 'antd';
import React, {useEffect, useState} from 'react';
import {getFullInteractionById, getRecentInteractions} from "../../../clients/interact-db-client/filter-operations";
import {Interaction} from "../../../clients/grl-client/interact_db_client";
import {LabeledValue} from "antd/lib/select";
import {SelectValue} from "./SelectValue";
import {fetchFilteredInteractionData} from "./FetchFilteredInteractionData";

const {Option} = Select;


;

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
        const recentInteractions = await getRecentInteractions();
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
            fetchFilteredInteractionData(newValue, setData);
        } else {
            setData([]);
        }
    };

    const handleChange = async (selectedLabeledValue: LabeledValue) => {
        if (!selectedLabeledValue) {
            return
        }
        console.log('Value selected', selectedLabeledValue, data);
        const selectedInteractionId = selectedLabeledValue.value;
        if (selectedInteractionId) {
            const selectedInteraction = data.find((interaction: SelectValue<Interaction>) => interaction.value === selectedInteractionId.toString());
            if (selectedInteraction && selectedInteraction.data) {
                const selecteInteractionFull = await getFullInteractionById(selectedInteraction.data.id);
                if (!selecteInteractionFull) {
                    console.error('full selected interaction not found on sever');
                    return;
                }
                setValue(SelectValue.fromInteraction(selecteInteractionFull));
                console.log('found selected interaction', data);
                if (selectedInteraction) {
                    props.onSelect(selectedInteraction);
                } else {
                    console.error('selected interaction not found');
                }
            }
        }


    };

    const options = data.map((d, index) => <Option key={index} value={d.data?.id}>{d.value + ': ' + d.label}</Option>);

    return (
        <div>
            {JSON.stringify(value)}
            <Select
                allowClear
                showSearch
                labelInValue={true}
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
        </div>
    );
};


export default FilterInteractionSingle;
