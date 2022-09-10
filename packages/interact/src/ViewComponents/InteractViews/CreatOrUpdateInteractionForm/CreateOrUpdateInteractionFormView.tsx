import {Form} from "antd";
import {Button, Radio, Title} from '@mantine/core';
import {useEffect, useState} from "react";
import {Interaction, InteractionIdentity, RelationTypes} from "../../../BackEnd/clients/grl-client/interact_db_client";
import {createOrUpdateInteraction,} from "../../../BackEnd/clients/interact-db-client/create-interaction-entity";
import {notify} from "../../../Services/toast/notify";
import {selectInteraction} from "../../../States/features/app-state/appStateSlice";
import {useDispatch} from "react-redux";
import {SizeType} from "antd/lib/config-provider/SizeContext";
import {
    CreateOrUpdateInteractionFormRelationInputs
} from "./FormComponents/CreateOrUpdateInteractionFormRelationInputs";
import {CreateOrUpdateInteractionFormValueInputs} from "./FormComponents/CreateOrUpdateInteractionFormValueInputs";
import {CreateInteractionFormData} from "./FormComponents/CreateInteractionFormData";
import {onFormRelationSelectedHandler} from "./FormComponents/OnFormRelationSelectedHandler";
import FilterInteractionSingle from "../../ViewComponents/FilterControls/FilterInteractionSingle";
import {getFullInteractionById} from "../../../BackEnd/clients/interact-db-client/filter-operations";
import {SelectValue} from "../../ViewComponents/FilterControls/FilterComponents/SelectValue";
import {Logger, LogSource} from "../../../Services/logger";
import {validateInteractionForm} from "./utils/FormValidator";
import {IconClearAll, IconCross, IconPlus, IconX} from "@tabler/icons";
import {FormMode} from "./FormComponents/EFormMode";
import {FormModeToggle} from "./FormModeToggle";

interface CreateOrUpdateInteractionFormViewProp {
    size: SizeType | undefined;
    existingFormData?: Interaction;
}

interface InteractionIdentitySelectionProps {
    onChange: (value: InteractionIdentity) => void;
}

function InteractionIdentitySelection(props: InteractionIdentitySelectionProps) {
    return <Radio.Group
        name={"interactionidentity"}
        label={"Interaction Identity"}
        description={"This is not necessarily the final judgment of the nature of the entity, but a convenient helper."}
        spacing={"xs"}
        size={"xs"}
        onChange={props.onChange}
        defaultValue={InteractionIdentity.Entity}
    >
        <Radio value={InteractionIdentity.Entity} label={"Entity"}/>
        <Radio value={InteractionIdentity.Act} label={"Act"}/>
        <Radio value={InteractionIdentity.Interaction} label={"Interaction"}/>
        <Radio value={InteractionIdentity.Category} label={"Category"}/>
        <Radio value={InteractionIdentity.Source} label={"Source"}/>
    </Radio.Group>;
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

    function onSwitchingFormMode(value: FormMode) {
        switch (value) {
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

            <div className={'mb-4 text-center'}>
                <FormModeToggle OnSegmentChange={onSwitchingFormMode}/>
            </div>

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

                <div className={'flex space-x-2 my-4'}>
                    <Title order={3} size="h1">
                        {formData.id && formData?.id > 0 ? formData.id : ''}
                    </Title>
                    <Title order={3} size="h1">
                        {formData.label}
                    </Title>
                </div>

                <div className={'flex justify-center space-x-4'}>

                    {/*Identity form*/}
                    <InteractionIdentitySelection onChange={(value) => setFormData({
                        ...formData,
                        identity: value
                    } as CreateInteractionFormData)}/>

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

                <div className={'flex justify-evenly'}>
                    <Button leftIcon={<IconClearAll/>} onClick={() => clearFormData()} variant="white" color="pink">
                        Clear
                    </Button>

                    <Button type='submit' leftIcon={<IconPlus/>} variant="white" color="cyan">
                        Submit
                    </Button>
                </div>

            </Form>
        </div>
    );
}

// Default props
CreateOrUpdateInteractionFormView.defaultProps = {
    size: 'small',
}
