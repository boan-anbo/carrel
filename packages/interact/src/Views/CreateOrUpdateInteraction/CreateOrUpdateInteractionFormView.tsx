import {Title} from '@mantine/core';
import {useEffect, useRef, useState} from "react";
import {Interaction, RelationTypes} from "../../BackEnd/grl-client/interact_db_client";
import {createOrUpdateInteraction,} from "../../BackEnd/interact-db-client/create-interaction-entity";
import {notify} from "../../Services/toast/notify";
import {selectInteraction} from "../../States/features/app-state/appStateSlice";
import {useDispatch} from "react-redux";
import {SizeType} from "antd/lib/config-provider/SizeContext";
import {
    CreateOrUpdateInteractionFormRelationInputs
} from "./FormComponents/CreateOrUpdateInteractionFormRelationInputs";
import {CreateOrUpdateInteractionFormValueInputs} from "./FormComponents/CreateOrUpdateInteractionFormValueInputs";
import {CreateInteractionFormData} from "./FormComponents/CreateInteractionFormData";
import {onFormRelationSelectedHandler} from "./FormComponents/OnFormRelationSelectedHandler";
import FilterInteractionSingle from "../_ViewComponents/Selectors/FilterInteractionSingle";
import {getFullInteractionById} from "../../BackEnd/interact-db-client/filter-operations";
import {SelectValue} from "../_ViewComponents/_ControlComponents/Select/SelectValue";
import {Logger, LogSource} from "../../Services/logger";
import {validateInteractionForm} from "./utils/FormValidator";
import {FormMode} from "./FormComponents/EFormMode";
import {FormModeToggle} from "./FormComponents/FormModeToggle";
import {
    InteractionIdentitySelection
} from "../_ViewComponents/InteractionIdentitySelection/InteractionIdentitySelection";
import {FormButtons} from "./FormComponents/FormButtons";

interface CreateOrUpdateInteractionFormViewProp {
    size: SizeType | undefined;
    existingFormData?: Interaction;
}


export const CreateOrUpdateInteractionFormView = (props: CreateOrUpdateInteractionFormViewProp) => {

    const log = new Logger(LogSource.CreateInteractionForm)

    const dispatch = useDispatch();

    /**
     * Hooked to label input field and automatically refocused on form clearance.
     */
    const focusRef = useRef(null)

    const [showRawJson, setShowRawJson] = useState(false);

    const [currentSelectedInteractionId, setCurrentSelectedInteractionId] = useState<string | undefined>(undefined);

    /**
     * Whether use edit or create mode
     */
    const [mode, setMode] = useState<FormMode>(FormMode.CREATE);


    const [
        formData, // single source of truth for form data
        setFormData
    ] = useState<CreateInteractionFormData>(
        new CreateInteractionFormData()
    )

    useEffect(() => {
        // if an interaction is feeded, watch for it and convert it to editable form.
        if (props.existingFormData) {
            loadFormDataFromExistingInteraction(props.existingFormData);
        }
    }, [props.existingFormData])

    function switchFormMode(mode: FormMode) {
        clearFormData();
        switch (mode) {
            case FormMode.CREATE:
                setMode(FormMode.CREATE);
                clearFormData();
                break;
            case FormMode.UPDATE:
                setMode(FormMode.UPDATE);
                break;
        }
    }

    const clearFormData = () => {
        log.info("Clearing form data");
        setFormData(new CreateInteractionFormData());
        setCurrentSelectedInteractionId(undefined);

        // @ts-ignore
        focusRef.current.focus();

    }

    const validate = () => {

        const validationErrors = validateInteractionForm(formData);
        if (validationErrors.length > 0) {
            validationErrors.forEach((error) => {
                notify(error.message, 'error', 'error');
                log.error(error.message, 'error', error);
                throw new Error('Form Invalid, see error messages');
            })
        }
    }

    async function onFormFinish() {
        log.info("onFormFinish", 'form Data when completed', formData);

        validate()

        const updatedEntity = await createOrUpdateInteraction(formData);

        console.log("Form receiveed", updatedEntity)
        if (updatedEntity.id) {
            notify('Created interaction entity', `${updatedEntity.label} (click to select)`, 'success',
                () => {
                    dispatch(selectInteraction(null))
                    dispatch(
                        selectInteraction(updatedEntity)
                    )
                }
            )
        }
        // clear form
        clearFormData();
        // if it's edit mode then we need to reload the form, otherwise, create a new form for the convenience of inputing new data.
        // load again from updated data
        if (mode === FormMode.UPDATE) {
            loadFormDataFromExistingInteraction(updatedEntity);
        }
    }


    function loadFormDataFromExistingInteraction(interaction: Interaction) {
        log.info("loadFormDataFromExistingInteraction", 'interaction', interaction);
        const formDataFromInteraction = CreateInteractionFormData.fromInteraction(interaction);
        log.info("Parsing form data from interaction", 'form data from interaction', formDataFromInteraction);
        setFormData(formDataFromInteraction);
    }

    async function loadInteractionToEdit(i: SelectValue<Interaction>) {

        log.info("loadInteractionToEdit", 'interaction to load', i);
        if (!i.value) {
            log.error("loadInteractionToEdit - no interaction to load");
        }
        const interactionFull = await getFullInteractionById(parseInt(i.value!, 10));
        log.info("loadInteractionToEdit received interaction", 'full interaction', interactionFull);
        if (interactionFull) {
            loadFormDataFromExistingInteraction(interactionFull);
        } else {
            notify('Error', 'Could not load interaction', 'error');
        }
    }


    return (
        <div
            className={'bg-gray-100 rounded drop-shadow px-4 py-2 space-y-4'}
            onMouseDown={e => e.stopPropagation()}>

            <div className={'text-center'}>
                <FormModeToggle
                    value={mode}
                    OnSegmentChange={switchFormMode}/>
            </div>

            <FilterInteractionSingle
                value={currentSelectedInteractionId}
                size={'xs'}
                placeholder={'Select interaction to update'}
                onSingleSelectionChange={(selectValue) => {
                    switchFormMode(FormMode.UPDATE)
                    loadInteractionToEdit(selectValue)
                }}
                style={{width: '100%'}}

            />


            {formData && formData.label.length > 0 &&
                <div className={'flex space-x-2'}>
                    <Title order={3} size="h2">
                        {formData.id && formData?.id > 0 ? formData.id : ''}
                    </Title>
                    <Title order={3} size="h2">
                        {formData.label}
                    </Title>
                </div>
            }

            <div className={'flex space-x-2'}>

                {/*Identity form*/}
                <InteractionIdentitySelection onChange={(value) => setFormData({
                    ...formData,
                    identity: value
                } as CreateInteractionFormData)}/>


            </div>

            <CreateOrUpdateInteractionFormValueInputs
                focusRef={focusRef}
                onSubmitForm={onFormFinish}
                formData={formData} size={'xs'}
                onLabelChange={(e) => {
                    setFormData({...formData, label: e} as CreateInteractionFormData)
                }}
                onDescriptionChange={(e) => setFormData({
                    ...formData,
                    description: e
                } as CreateInteractionFormData)}
                onContentChange={(e) => setFormData({
                        ...formData,
                        content: e
                    } as CreateInteractionFormData
                )}/>

            <CreateOrUpdateInteractionFormRelationInputs
                onSubmitForm={() => onFormFinish()}
                formData={formData} size={'xs'}
                onContextsSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.ContextRelation, formData, setFormData)}
                onSubjectsSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.SubjectRelation, formData, setFormData)}
                onFirstActsSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.FirstActRelation, formData, setFormData)}
                onObjectsSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.ObjectRelation, formData, setFormData)}
                onSecondActsSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.SecondActRelation, formData, setFormData)}

                onIndirectObjectsSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.IndirectObjectRelation, formData, setFormData)}
                onSettingsSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.SettingRelation, formData, setFormData)}
                onPurpoesSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.PurposeRelation, formData, setFormData)}
                onParallelSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.ParallelRelation, formData, setFormData)}
                onReferencesSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.ReferenceRelation, formData, setFormData)}
                onCategoriesSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.CategoryRelation, formData, setFormData)}
            />

            <div className={'flex justify-evenly my-2'}>

                <FormButtons onClearShowJson={() => {

                    setShowRawJson(!showRawJson)
                }}

                             onClickClear={() => clearFormData()}
                             onSubmit={() => onFormFinish()}
                />
            </div>
            <div>

                {showRawJson && <pre>{JSON.stringify(formData, null, 2)}</pre>}
            </div>

        </div>
    );
}

// Default props
CreateOrUpdateInteractionFormView.defaultProps = {
    size: 'small',
}
