import React, {useEffect, useState} from 'react';
import {Interaction, InteractionIdentity} from "../../../BackEnd/grl-client/interact_db_client";
import {fetchFilteredInteractionData} from "./FilterComponents/FetchFilteredInteractionData";
import {IFilterInteractionMultipleProps} from "./IFilterInteractionMultipleProps";
import {SelectValue} from "../_ControlComponents/Select/SelectValue";
import {Logger, LogSource} from "../../../Services/logger";
import {MultiSelectValue} from "../_ControlComponents/Select/MultiSelectValue";
import {IFilterInteractionSingleProps} from "./IFilterInteractionSingleProps";
import {SingleSelectControl} from "../_ControlComponents/Select/SingleSelectControl";

const FilterInteractionSingle = (props: IFilterInteractionSingleProps<Interaction>) => {
    const log = new Logger(LogSource.FilterInteractionSingle);
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

    const fetchOptions = async (query?: string) => {

        // load initial values
        const fetchedOptions = await fetchFilteredInteractionData(query ? query : '', undefined, props.filterByEntityRelation);
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


    function onSelectDropdownOpen() {
        fetchOptions();
    }

    return (
        <div>
            {/*{JSON.stringify(selectedValues)}*/}
            <div className={''}>
                {props.showLabel && <div>{props.label}</div>}
                <SingleSelectControl
                    label={props.label}
                    size={props.size}
                    onDropdownOpen={onSelectDropdownOpen}
                    value={selectedValues}
                    placeholder={props.placeholder}
                    style={props.style}
                    onChange={handleChange}
                    onSearchChange={fetchOptions}
                    data={multiSelectOptions}/>
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
