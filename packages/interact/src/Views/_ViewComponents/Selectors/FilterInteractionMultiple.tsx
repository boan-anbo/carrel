import React, {useEffect, useState} from 'react';
import {Interaction, InteractionIdentity} from "../../../BackEnd/clients/grl-client/interact_db_client";
import {CreateRelationDto} from "../../CreateOrUpdateInteraction/FormComponents/CreateRelationDto";
import {fetchFilteredInteractionData} from "./FilterComponents/FetchFilteredInteractionData";
import {IFilterInteractionMultipleProps} from "./IFilterInteractionMultipleProps";
import {SelectValue} from "../_ControlComponents/Select/SelectValue";
import {Logger, LogSource} from "../../../Services/logger";
import {MultiSelectValue} from "../_ControlComponents/Select/MultiSelectValue";
import {MultiSelectControl} from "../_ControlComponents/Select/MultiSelectControl";

const FilterInteractionMultiple = (props: IFilterInteractionMultipleProps<Interaction>) => {
    const log = new Logger(LogSource.FilterInteractionMultiple);
    /**
     * Data for displayed options. Fetched from the backend as {@see Interaction}[], and converted to {@see SelectValue<Interaction>[]} for the Select component.
     */
    const [multiSelectOptions, setMultiSelectOptions] = useState<MultiSelectValue<Interaction>[]>([]);
    const [interactionPool, setInteractionPool] = useState<SelectValue<Interaction>[]>([]);
    const [selectedValues, setSelectedValues] = useState<string []>([]);

    // on mount
    useEffect(() => {

        fetchOptions();

        if (props.currentValueDtos) {
            loadInitialData();
        }

    }, [props.currentValueDtos]);

    function loadPoolsAndOptions(fetchedOptions: SelectValue<Interaction>[]) {

        setInteractionPool(fetchedOptions);
        setMultiSelectOptions(fetchedOptions.map((selection) => selection.toMultiSelectValue()));
    }

    const fetchOptions = async () => {

        // load initial values
        const fetchedOptions = await fetchFilteredInteractionData('', undefined, props.filterByEntityRelation);
        loadPoolsAndOptions(fetchedOptions);

    }


    const loadInteractionsFromPool = (interactionIds: string[]): SelectValue<Interaction>[] => {
        return interactionPool.filter(i => interactionIds.includes(i.toValueString()));
    }

    const loadSelectValuesFromPool = (interactionIds: string[]): SelectValue<Interaction>[] => {

        const convertedValues = loadInteractionsFromPool(interactionIds)
            .map((selection) => {
                if (!selection.data) {
                    log.error("Submitting selection to upper level failed because it cannot find the Interaction data from the fetched selection pools", 'Selection Id', selection);
                }
                return SelectValue.fromInteraction(selection.data!)

            });
        if (convertedValues.length !== interactionIds.length) {
            log.error("Conversion loss", "before & after", {
                interactionIds,
                convertedValues
            })
        }

        return convertedValues;
    }

    const loadInitialData = async () => {
        const currentValueDtos: CreateRelationDto[] = props.currentValueDtos as CreateRelationDto[];
        // log.('Loaded Dto from above', 'dtos', currentValueDtos);
        const values: SelectValue<Interaction>[] = [];
        // await loop
        let index = 0;
        for await (const currentValueDto of currentValueDtos) {
            if (currentValueDto.linkedInteractionId) {
                const interactionSelectValue = loadInteractionsFromPool([currentValueDto.linkedInteractionId.toString()])[0];
                if (interactionSelectValue) {
                    values.push(interactionSelectValue);
                }
            }
            index++;
        }

        setMultiSelectOptions(values.map(selectValue => selectValue.toMultiSelectValue<Interaction>()));
        // log.debug('Retranslated values', "retranslated values received from upper level", latestValues);
        setSelectedValues(values.map(v => v.toValueString()));
    }

    const handleChange = (selectedIds: string[]) => {

        // check duplicates

        setSelectedValues([...selectedIds]);
        const latestSelections: SelectValue<Interaction>[] = loadSelectValuesFromPool(selectedIds);
        log.info("SelectValuesToPassUpwards", 'Selections', latestSelections)
        // pass on latest selections to upper component
        props.onMultiSelectionChange(latestSelections);
    };

    /**
     * Add the newly selected/created/retrived interaction to the options pool and selection
     * @param interaction
     */
    function addInteractionToOptionsAndSelection(interaction: Interaction) {
        const selectionToAdd: SelectValue<Interaction> = SelectValue.fromInteraction(interaction);
        setMultiSelectOptions([...multiSelectOptions, selectionToAdd.toMultiSelectValue()]);
        handleChange([...selectedValues, selectionToAdd.toValueString()]);
    }

    return (
        <div>
            {/*{JSON.stringify(selectedValues)}*/}
            <div className={''}>
                <MultiSelectControl
                    size={props.size}
                    description={props.description}
                    label={props.label} value={selectedValues} placeholder={props.placeholder}
                    style={props.style} createLabel={(query) => `Create new entity: ${query}`}
                    onCreate={(query) => {
                        const item = {value: query, label: query};
                        setMultiSelectOptions((current) => [...current, item]);
                        return item;
                    }} onChange={handleChange} data={multiSelectOptions}
                />
            </div>
        </div>
    );
};

FilterInteractionMultiple.defaultProps = {
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


export default FilterInteractionMultiple;
