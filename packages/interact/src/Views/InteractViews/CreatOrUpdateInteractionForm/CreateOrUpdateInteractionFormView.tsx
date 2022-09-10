import {Button, Form, Radio} from "antd";
import {useEffect, useState} from "react";
import {Interaction, InteractionIdentity, RelationTypes} from "../../../clients/grl-client/interact_db_client";
import {createOrUpdateInteraction,} from "../../../clients/interact-db-client/create-interaction-entity";
import {notify} from "../../../utils/toast/notify";
import {selectInteraction} from "../../../features/app-state/appStateSlice";
import {useDispatch} from "react-redux";
import {SizeType} from "antd/lib/config-provider/SizeContext";
import {
    CreateOrUpdateInteractionFormRelationInputs
} from "./FormComponents/CreateOrUpdateInteractionFormRelationInputs";
import {CreateOrUpdateInteractionFormValueInputs} from "./FormComponents/CreateOrUpdateInteractionFormValueInputs";
import {CreateInteractionFormData} from "./FormComponents/CreateInteractionFormData";
import {onFormRelationSelectedHandler} from "./FormComponents/OnFormRelationSelectedHandler";
import FilterInteractionSingle from "../../ViewComponents/FilterControls/FilterInteractionSingle";
import {getFullInteractionById} from "../../../clients/interact-db-client/filter-operations";
import {SelectValue} from "../../ViewComponents/FilterControls/SelectValue";
import {Logger, LogSource} from "../../../utils/logger";
import {FormButtons} from "./FormComponents/FormButtons";
import {FormMode} from "./FormComponents/EFormMode";
import {validateInteractionForm} from "./FormValidator";

interface CreateOrUpdateInteractionFormViewProp {
    size: SizeType | undefined;
    existingFormData?: Interaction;
}

export const CreateOrUpdateInteractionFormView = (props: CreateOrUpdateInteractionFormViewProp) => {

    const log = new Logger(LogSource.CreateInteractionForm)

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [showRawJson, setShowRawJson] = useState(false);

    const [mode, setMode] = useState<FormMode>(FormMode.CREATE);

    const [
        formData, // single source of truth for form data
        setFormData
    ] = useState<CreateInteractionFormData>(
        new CreateInteractionFormData()
    )

    useEffect(() => {
        if (props.existingFormData) {
            loadFormDataFromExistingInteraction(props.existingFormData);
        }
    }, [props.existingFormData])

    const clearFormData = () => {
        setFormData(new CreateInteractionFormData());
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

    async function onFormFinish(_: any) {
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
            onMouseDown={e => e.stopPropagation()}>
            {showRawJson && <pre>{JSON.stringify(formData, null, 2)}</pre>}
            <FormButtons mode={mode} onClick={() => setMode(FormMode.UPDATE)}
                         onClick1={() => setMode(FormMode.CREATE)}/>

            {mode === FormMode.UPDATE &&
                <FilterInteractionSingle
                    size={'small'}
                    placeholder={'Select interaction to update'}
                    onSelect={(selectValue) => {
                        loadInteractionToEdit(selectValue)
                    }}
                    style={{width: '100%'}}

                />}

            <Form
                className={'px-2'}
                size={props.size}
                form={form}
                title={'Create Interaction'}
                layout="vertical"
                initialValues={formData}
                onFinish={onFormFinish}
            >


                <div className={'flex justify-center space-x-4'}>
                    <div>{formData.id}</div>
                    <Radio.Group
                        value={formData.identity}
                        size={props.size}
                        onChange={(e) => setFormData({
                            ...formData,
                            identity: e.target.value
                        } as CreateInteractionFormData)}
                    >
                        <Radio.Button value={InteractionIdentity.Act}>Act</Radio.Button>
                        <Radio.Button value={InteractionIdentity.Entity}>Entity</Radio.Button>
                        <Radio.Button value={InteractionIdentity.Interaction}>Interaction</Radio.Button>
                        <Radio.Button value={InteractionIdentity.Source}>Source</Radio.Button>
                    </Radio.Group>
                    <div>
                        {/* Primary button */}
                        <button className={showRawJson ? 'b2-active' : 'b2'}
                                onClick={() => setShowRawJson(!showRawJson)}>Raw
                        </button>
                    </div>
                </div>

                <CreateOrUpdateInteractionFormValueInputs
                    formData={formData} size={props.size}
                    onLabelChange={(e) => {
                        setFormData({...formData, label: e.target.value} as CreateInteractionFormData)
                    }}
                    onDescriptionChange={(e) => setFormData({
                        ...formData,
                        description: e.target.value
                    } as CreateInteractionFormData)}
                    onContentChange={(e) => setFormData({
                            ...formData,
                            content: e.target.value
                        } as CreateInteractionFormData
                    )}/>

                <CreateOrUpdateInteractionFormRelationInputs
                    formData={formData} size={props.size}
                    onContextsSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.ContextRelation, formData, setFormData)}
                    onSubjectsSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.SubjectRelation, formData, setFormData)}
                    onFirstActsSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.FirstActRelation, formData, setFormData)}
                    onObjectsSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.ObjectRelation, formData, setFormData)}
                    onSecondActsSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.SecondActRelation, formData, setFormData)}

                    onIndirectObjectsSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.IndirectObjectRelation, formData, setFormData)}
                    onSettingsSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.SettingRelation, formData, setFormData)}
                    onPurpoesSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.PurposeRelation, formData, setFormData)}
                    onParallelSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.ParallelRelation, formData, setFormData)}
                    onReferencesSelected={(e) => onFormRelationSelectedHandler(e, RelationTypes.ReferenceRelation, formData, setFormData)}/>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
                {/*    Clear button */}
                <Form.Item>
                    <Button type="primary" htmlType="reset" onClick={() => clearFormData()}>Clear</Button>
                </Form.Item>


            </Form>
        </div>
    );
}

// Default props
CreateOrUpdateInteractionFormView.defaultProps = {
    size: 'small',
}
