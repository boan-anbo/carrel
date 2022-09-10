import React, {useEffect, useState} from 'react';
import {Interaction, InteractionIdentity} from "../../../BackEnd/clients/grl-client/interact_db_client";

import {LabeledValue} from "antd/lib/select";
import {fetchFilteredInteractionData} from "./FilterComponents/FetchFilteredInteractionData";
import {IFilterInteractionMultipleProps} from "./IFilterInteractionMultipleProps";
import {SelectValue} from "./FilterComponents/SelectValue";
import {getInteractionSelectionLabel} from "./filter-utils/getInteractionLabel";
import {Logger, LogSource} from "../../../Services/logger";
import {MultiSelectValue} from "../_ControlComponents/Select/MultiSelectValue";
import {Select} from '@mantine/core';
import {IFilterInteractionSingleProps} from "./IFilterInteractionSingleProps";

const FilterInteractionSingle = (props: IFilterInteractionSingleProps<Interaction>) => {
    const log = new Logger(LogSource.FilterInteractionMultiple);
    /**
     * Data for displayed options. Fetched from the backend as {@see Interaction}[], and converted to {@see SelectValue<Interaction>[]} for the Select component.
     */
    const [multiSelectOptions, setMultiSelectOptions] = useState<MultiSelectValue<Interaction>[]>([]);
    const [interactionPool, setInteractionPool] = useState<SelectValue<Interaction>[]>([]);
    const [selectedValues, setSelectedValues] = useState<string | null>(null);

    // on mount
    useEffect(() => {

        fetchOptions();


    }, []);

    function loadPoolsAndOptions(fetchedOptions: SelectValue<Interaction>[]) {

        setInteractionPool(fetchedOptions);
        setMultiSelectOptions(fetchedOptions.map((selection) => selection.toMultiSelectValue()));
    }

    const fetchOptions = async () => {

        // load initial values
        const fetchedOptions = await fetchFilteredInteractionData('', undefined, props.filterByEntityRelation);
        loadPoolsAndOptions(fetchedOptions);

    }


    const loadInteractionsFromPool = (interactionIds: string): SelectValue<Interaction> => {
        return interactionPool.find(i => i.toValueString() === interactionIds)!;
    }

    const loadSelectValuesFromPool = (interactionIds: string): SelectValue<Interaction> => {

        const selectedValue = loadInteractionsFromPool(interactionIds);

        if (!selectedValue.data) {
            log.error("Submitting selection to upper level failed because it cannot find the Interaction data from the fetched selection pools", 'Selection Id', selectedValue);
        }
        return selectedValue;

    }


    const handleChange = (selectedId: string) => {

        // check duplicates

        setSelectedValues(selectedId);
        const latestSelections: SelectValue<Interaction> = loadSelectValuesFromPool(selectedId);
        log.info("SelectValuesToPassUpwards", 'Selections', latestSelections)
        // pass on latest selections to upper component
        props.onSingleSelectionChange(latestSelections);
    };



    return (
        <div>
            {/*{JSON.stringify(selectedValues)}*/}
            <div className={''}>
                {props.showLabel && <div>{props.label}</div>}
                <Select
                    clearable
                    searchable
                    value={selectedValues}
                    placeholder={props.placeholder}
                    style={props.style}
                    creatable
                    onChange={handleChange}
                    data={multiSelectOptions}>


                </Select>
            </div>
        </div>
    );
};

FilterInteractionSingle.defaultProps = {
    placeholder: 'Select interactions',
    style: {width: '100%'},

    label: 'Filter interactions',
    showConfirm: false,
    onEntityCreated: (interaction: Interaction) => {
        console.log('onEntityCreated', interaction);
    },
    allowCreateNewEntity: true,
    createInteractionIdentity: InteractionIdentity.Entity,

} as IFilterInteractionMultipleProps<Interaction>


export default FilterInteractionSingle;
