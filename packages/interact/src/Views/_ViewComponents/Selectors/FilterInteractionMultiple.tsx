import React, {useEffect, useState} from 'react';
import {Interaction, InteractionIdentity} from "../../../BackEnd/grl-client/interact_db_client";
import {CreateRelationDto} from "../../CreateOrUpdateInteraction/FormComponents/CreateRelationDto";
import {fetchFilteredInteractionData} from "./FilterComponents/FetchFilteredInteractionData";
import {IFilterInteractionMultipleProps} from "./IFilterInteractionMultipleProps";
import {SelectValue} from "../_ControlComponents/Select/SelectValue";
import {Logger, LogSource} from "../../../Services/logger";
import {MultiSelectValue} from "../_ControlComponents/Select/MultiSelectValue";
import {MultiSelectControl} from "../_ControlComponents/Select/MultiSelectControl";
import {createInteractionEntity} from "../../../BackEnd/interact-db-client/create-interaction-entity";
import {SearchState, updateSearchOptionPool} from "../../../States/features/search-state/searchStateSlice";
import {RootState} from "../../../store";
import {useDispatch, useSelector} from "react-redux";

const FilterInteractionMultiple = (props: IFilterInteractionMultipleProps<Interaction>) => {
    const log = new Logger(LogSource.FilterInteractionMultiple);
    /**
     * Data for displayed options. Fetched from the backend as {@see Interaction}[], and converted to {@see SelectValue<Interaction>[]} for the Select component.
     */
    const [multiSelectOptions, setMultiSelectOptions] = useState<MultiSelectValue<Interaction>[]>([]);
    const [selectedValues, setSelectedValues] = useState<string []>([]);

    const searchOptionPool = useSelector<RootState, SearchState>(state => state.searchstate);

    const dispatch = useDispatch();

    // on mount
    useEffect(() => {

        fetchOptions();

        log.debug('searchOptionPool', 'search pool', searchOptionPool);

        if (props.currentValueDtos) {
            loadInitialData();
        }

    }, [props.currentValueDtos]);

    /**
     * Single source of truth for setting/update the selected values.
     * @param fetchedOptions
     */
    function updateDatePool(fetchedOptions: SelectValue<Interaction>[]) {

        dispatch(
        updateSearchOptionPool(fetchedOptions)
        );
        setMultiSelectOptions(fetchedOptions.map((selection) => selection.toMultiSelectValue()));
    }

    const fetchOptions = async (query?: string) => {


        // load initial values
        const fetchedOptions = await fetchFilteredInteractionData(query ? query : '', undefined, props.filterByEntityRelation);
        updateDatePool(fetchedOptions);

    }

    const findInteractionsFromPoolByIds = (interactionIds: string[]) => {
        return searchOptionPool.filter(i => interactionIds.includes(i.toValueString()));
    }

    const loadSelectValuesFromPool = (interactionIds: string[], pool?: SelectValue<Interaction>[] | undefined): SelectValue<Interaction>[] => {

        const foundInteractions = pool ?
            pool.filter(i => interactionIds.includes(i.toValueString())) :
            findInteractionsFromPoolByIds(interactionIds);

        const convertedValues = foundInteractions.map((selection) => {
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
                const interactionSelectValue = findInteractionsFromPoolByIds([currentValueDto.linkedInteractionId.toString()])[0];
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

    /**
     * The pool is conditionally provided rather than let the function use the state directly, because the state is not updated immediately.
     * @param selectedIds
     * @param pool
     */
    const emitChange = (selectedIds: string[], pool?: SelectValue<Interaction>[]) => {

        // check duplicates

        setSelectedValues([...selectedIds]);
        const latestSelections: SelectValue<Interaction>[] = loadSelectValuesFromPool(selectedIds, pool);
        log.info("SelectValuesToPassUpwards", 'Selections', latestSelections)
        // pass on latest selections to upper component
        props.onMultiSelectionChange(latestSelections);
    };

    /**
     * Handler for creating a new interaction on-the-goal
     * Add the newly selected/created/retrived interaction to the options pool and selection after creation
     * @param newInteractionLabel
     */
    const onMultiSelectControlCreate = async (newInteractionLabel: string) => {

        log.info("onMultiSelectControlCreate", "newInteractionLabel", newInteractionLabel);
        const createdInteraction = await createInteractionEntity(newInteractionLabel, props.createInteractionIdentity ?? InteractionIdentity.Entity);
        log.info("onMultiSelectControlCreate", "createdInteraction", createdInteraction);
        const selectionToAdd: SelectValue<Interaction> = SelectValue.fromInteraction(createdInteraction);
        // update the option pool of {@see SelectValue<Interaction>}[] so that the newly created interaction can be selected
        updateDatePool([...searchOptionPool, selectionToAdd]);
        // update the selected values so that the newly created interaction can be selected
        emitChange([...selectedValues, selectionToAdd.toValueString()], [...searchOptionPool, selectionToAdd]);
        return
    }

    /**
     * On keydown
     */
    const onMultiSelectControlKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // if it's Ctrl + Enter, create a new interaction
        if (event.altKey && event.key === 'Enter') {
            const query = event.currentTarget.value;
            if (!(query.trim().length > 0)) {
                return;
            }

            log.info("Creating entity on the goal", "event", event);
            onMultiSelectControlCreate(event.currentTarget.value);
            // blur the input field
            event.currentTarget.blur();
            // refocus the input field
            event.currentTarget.focus();
        }

        // if it's control + alt + enter, submit the whole form
        if (event.ctrlKey && event.key === 'Enter') {
            log.info("Submitting the whole form", "event", event);
            if (props.onSubmitForm) {
                props.onSubmitForm();
            }
        }
    }

    return (
        <div>
            {/*{JSON.stringify(selectedValues)}*/}
            <div className={''}>
                <MultiSelectControl
                    readOnly={props.readOnly}
                    clearSearchOnChange={true}
                    size={props.size}
                    clearSearchOnBlur={true}
                    description={props.description}
                    label={props.label}
                    value={selectedValues}
                    placeholder={props.placeholder}
                    onKeyDown={onMultiSelectControlKeyDown}
                    style={props.style}
                    getCreateLabel={(query) => `Create new entity: ${query}`}

                    // @ts-ignore
                    onCreate={onMultiSelectControlCreate}
                    onSearchChange={fetchOptions}
                    onChange={emitChange}
                    data={multiSelectOptions}
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
