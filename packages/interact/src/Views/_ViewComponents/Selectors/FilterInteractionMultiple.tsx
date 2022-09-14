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
import {notify} from "../../../Services/toast/notify";

const FilterInteractionMultiple = (props: IFilterInteractionMultipleProps<Interaction>) => {
        const log = new Logger(LogSource.FilterInteractionMultiple);
        /**
         * Data for displayed options. This reflects the first batch of results filtered from the server to select from.
         *
         * This is constantly updated as the user types in the search box.
         */
        const [currentAvailableSelectOptions, setCurrentAvailableSectOptions] = useState<MultiSelectValue<Interaction>[]>([]);

        /**
         * This is all interactions selections that has been fetched from the server.
         *
         * This is necessary to serve as the data pool to translate between {@link SelectValue} and Selected string Ids.
         *
         * Mantine MultiSelect only pass up the selected string Ids, but we need to pass up the {@link SelectValue} to the upper components.
         *
         * So each time the selected string Ids change, we need to translate them to {@link SelectValue} and pass them up.
         *
         * This is the data pool to do the translation.
         *
         * TODO currently this pool keeps expand as user fetch more data from the server in one session.
         *
         * FIXME I will add a function to drop non-selected interactions from this pool when the user leaves the page.
         *
         */
        const [allInteractionsPool, setAllAllInteractionsPool] = useState<SelectValue<Interaction>[]>([]);

        /**
         * The currently selected interaction ids, this controls what the MultiSelect shows as selected.
         */
        const [selectedInteractionIds, setSelectedInteractionIds] = useState<string []>([]);

        /**
         * This is the same as the selected Interaction Ids, but in the form of {@link SelectValue}.
         *
         * This is added because even though each selection change requires updating both the {@link selectedInteractionIds} and the {@link selectedSelectValues}, having this parallel state variable allows us to separate those local states (string[]) for the multicontrol, and those states (selected values) to pass to other components.
         */
        const [selectedSelectValues, setSelectedSelectValues] = useState<SelectValue<Interaction>[]>([]);

        // on mount
        useEffect(() => {

            fetchOptions();

            if (props.currentValueDtos) {
                loadInheritedData();
            }

        }, [props.currentValueDtos]);

        /**
         * Currently available options to select from, this does NOT necessarily include data that has been selected already.
         * All the past data selected is in another pool.
         * @param fetchedOptions
         */
        function updateMultiSelectionOptions(fetchedOptions: SelectValue<Interaction>[]) {

            // updated interaction pool with new data, and replace old items with the same SelectValue.value
            const latestPool = [...allInteractionsPool];

            fetchedOptions.forEach((fetchedOption) => {
                // if an select value already exists in the past pool, replace it with the new one.
                const index = latestPool.findIndex((poolItem) => poolItem.value === fetchedOption.value);
                if (index >= 0) {
                    latestPool[index] = fetchedOption;
                } else {
                    latestPool.push(fetchedOption);
                }
            })
            // update the interaction pool to reflect new selections
            setAllAllInteractionsPool(latestPool);
            // update the
            setCurrentAvailableSectOptions(fetchedOptions.map((selection) => selection.toMultiSelectValue()));
        }

        const fetchOptions = async (query?: string) => {


            // log.info('fetchOptions', 'query', query);
            // load initial values
            const fetchedOptions = await fetchFilteredInteractionData(query ? query : '', undefined, props.filterByEntityRelation);
            updateMultiSelectionOptions(fetchedOptions);

        }

        const findInteractionsFromPoolByIds = (interactionIds: string[]) => {

            return allInteractionsPool.filter(i => interactionIds.includes(i.toValueString()));
        }

        const loadSelectValuesFromPool = (interactionIds: string[], latestPool?: SelectValue<Interaction>[]): SelectValue<Interaction>[] => {

            // if a latest pool is provided, use it, otherwise use the current pool.
            // This is necessary because the current pool is updated asynchronously, so we need to use the latest pool to get the latest data when necessary.
            const foundInteractions = latestPool ?
                latestPool.filter(i => interactionIds.includes(i.toValueString())) :
                findInteractionsFromPoolByIds(interactionIds);


            const convertedValues = foundInteractions.map((selection) => {
                if (!selection.data) {
                    log.error("Submitting selection to upper level failed because it cannot find the Interaction data from the fetched selection pools", 'Selection Id', selection);
                }
                return SelectValue.fromInteraction(selection.data!)

            });
            if (convertedValues.length !== interactionIds.length) {
                log.error("Conversion loss: some of the interactions are not found in the current interaction data pool for the MultiSelect", "before & after", {
                    interactionIds,
                    convertedValues,
                    allInteractionsPool
                })
            }

            return convertedValues;
        }

        // most often the form data from already existing interaction.
        const loadInheritedData = async () => {
            const currentValueDtos: CreateRelationDto[] = props.currentValueDtos as CreateRelationDto[];
            const inheritedSelectValues: SelectValue<Interaction>[] = [];
            // await loop
            let index = 0;
            for await (const currentValueDto of currentValueDtos) {
                // if (currentValueDto.linkedInteractionId) {
                // const interactionSelectValue = findInteractionsFromPoolByIds([currentValueDto.linkedInteractionId.toString()])[0];
                // if (interactionSelectValue) {
                if (!currentValueDto.linkedInteraction) {
                    throw new Error("Linked interaction is not provided in the dto to MultiSelect. Check the upper components, such as the CreateOrUpdateInteraction component has include LinkedInteraction.");
                }
                inheritedSelectValues.push(SelectValue.fromInteraction(currentValueDto.linkedInteraction));
                // }

            }
            index++;

            // log.info('Loaded Dto from above', 'Converted values', inheritedSelectValues);
            // update all values with inherited values. This step does not use any other handling function to avoid pollution.
            setCurrentAvailableSectOptions(inheritedSelectValues.map(selectValue => selectValue.toMultiSelectValue<Interaction>()));
            setSelectedSelectValues(inheritedSelectValues);
            setSelectedInteractionIds(inheritedSelectValues.map(v => v.toValueString()));
        }

        /**
         * The pool is conditionally provided rather than let the function use the state directly, because the state is not updated immediately.
         * @param selectedIds
         * @param passToUpperLevel
         */
        const handleMultiControlSelectChange = (selectedIds: string[], passToUpperLevel?: boolean) => {
            setSelectedInteractionIds([...selectedIds]);
            const selectedSelectValues = loadSelectValuesFromPool(selectedIds);
            setSelectedSelectValues(selectedSelectValues);
            if (passToUpperLevel) {
                passSelectionsUpwards(selectedSelectValues);
            }
        };

        /**
         * Emit to upper level
         */
        const passSelectionsUpwards = (selections: SelectValue<Interaction>[]) => {
            log.info("SelectValuesToPassUpwards", 'Selections', selections)
            props.onMultiSelectionChange(selections);

        }

        /**
         * Handler for creating a new interaction on-the-goal
         * Add the newly selected/created/retrived interaction to the options pool and selection after creation
         * @param newInteractionLabel
         */
        const onMultiSelectControlCreate = async (newInteractionLabel: string) => {

            log.info("onMultiSelectControlCreate", "newInteractionLabel", newInteractionLabel);
            const createdInteraction = await createInteractionEntity(newInteractionLabel, props.createInteractionIdentity ?? InteractionIdentity.Entity);
            log.info("onMultiSelectControlCreate", "createdInteraction", createdInteraction);

            notify("Created new interaction: " + createdInteraction.label, "success");

            const selectionToAdd: SelectValue<Interaction> = SelectValue.fromInteraction(createdInteraction);

            // including all {SelectValue<Interaction>} in the pool.
            const latestSelecValueOptionsPool: SelectValue<Interaction>[] = [...allInteractionsPool, selectionToAdd];

            // update the option pool of {@see SelectValue<Interaction>}[] so that the newly created interaction can be selected
            updateMultiSelectionOptions([...latestSelecValueOptionsPool]);

            const latestSelectedIds: string[] = [...selectedInteractionIds, selectionToAdd.toValueString()];

            // update local control selected values to reflex the latest selections including the newly created one
            handleMultiControlSelectChange(latestSelectedIds, true);

            // this is key: provide latest pool to the function to get the latest data, otherwise it will not be able to find the newly created interaction.
            const latestSelectedValues: SelectValue<Interaction>[] = [...selectedSelectValues, selectionToAdd];

            // // pass the latest selections to upper level
            passSelectionsUpwards(latestSelectedValues);

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
                        value={selectedInteractionIds}
                        placeholder={props.placeholder}
                        onKeyDown={onMultiSelectControlKeyDown}
                        style={props.style}
                        getCreateLabel={(query) => `Create new entity: ${query}`}

                        // @ts-ignore
                        onCreate={onMultiSelectControlCreate}
                        onSearchChange={fetchOptions}
                        onChange={(e) => {
                            handleMultiControlSelectChange(e, true)
                        }}
                        data={currentAvailableSelectOptions}
                    />
                </div>
            </div>
        );
    }
;

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
