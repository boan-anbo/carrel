import {Button, Form, Radio} from "antd";
import {useEffect, useState} from "react";
import {Interaction, InteractionIdentity, RelationTypes} from "../../../clients/grl-client/interact_db_client";
import {createOrUpdateInteraction,} from "../../../clients/interact-db-client/create-interaction-entity";
import {notify} from "../../../utils/toast/notify";
import {selectInteraction} from "../../../features/app-state/appStateSlice";
import {useDispatch} from "react-redux";
import {SizeType} from "antd/lib/config-provider/SizeContext";
import {CreateOrUpdateInteractionFormRelationInputs} from "./CreateOrUpdateInteractionFormRelationInputs";
import {CreateOrUpdateInteractionFormValueInputs} from "./CreateOrUpdateInteractionFormValueInputs";
import {CreateInteractionFormData} from "./CreateInteractionFormData";
import {onFormRelationSelectedHandler} from "./OnFormRelationSelectedHandler";

interface CreateOrUpdateInteractionFormViewProp {
    size: SizeType | undefined;
    existingFormData?: Interaction;
}

enum FormMode {
    CREATE = "CREATE",
    UPDATE = "UPDATE"
}

export const CreateOrUpdateInteractionFormView = (props: CreateOrUpdateInteractionFormViewProp) => {

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [showRawJson, setShowRawJson] = useState(false);

    const [mode, setMode] = useState<FormMode>(FormMode.CREATE);

    const [formData, setFormData] = useState<CreateInteractionFormData>(
        new CreateInteractionFormData()
    )

    useEffect(() => {
        if (props.existingFormData) {
            setFormData(CreateInteractionFormData.fromInteraction(props.existingFormData));
        }
    }, [props.existingFormData])

    const clearFormData = () => {
        setFormData(new CreateInteractionFormData());
    }

    async function onFormFinish(values: any) {
        console.log(values)
        const result = await createOrUpdateInteraction(formData);

        console.log("Form receiveed", result)
        if (result.id) {
            notify('Created interaction entity', `${result.label} (click to select)`, 'success',
                () => {
                    dispatch(selectInteraction(null))
                    dispatch(
                        selectInteraction(result)
                    )
                }
            )
        }
        // clear form
        clearFormData();
    }

    function onFormValuesChange(changedValues: any, values: any) {
        console.log(changedValues)
        setFormData(values)
    }

    return (
        <div
            onMouseDown={e => e.stopPropagation()}>
            {showRawJson && <pre>{JSON.stringify(formData, null, 2)}</pre>}
            <div className={'flex space-x-2 space-x-2'}>
                <button onClick={() => setMode()}>Edit</button>
                <button>New</button>
            </div>
            <Form
                className={'px-4'}
                size={props.size}
                form={form}
                title={'Create Interaction'}
                layout="vertical"
                initialValues={formData}
                onFinish={onFormFinish}
                onValuesChange={onFormValuesChange}>


                <div className={'flex justify-center space-x-4'}>
                    <div>{formData.id}</div>
                    <Form.Item>
                        <Radio.Group
                            value={formData.identity}
                            size={props.size}
                            onChange={(e) => setFormData({...formData, identity: e.target.value})}
                        >
                            <Radio.Button value={InteractionIdentity.Act}>Act</Radio.Button>
                            <Radio.Button value={InteractionIdentity.Entity}>Entity</Radio.Button>
                            <Radio.Button value={InteractionIdentity.Interaction}>Interaction</Radio.Button>
                            <Radio.Button value={InteractionIdentity.Source}>Source</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <div>
                        {/* Primary button */}
                        <button itemType={'primary'} onClick={() => setShowRawJson(!showRawJson)}>Raw</button>
                    </div>
                </div>

                <CreateOrUpdateInteractionFormValueInputs formData={formData} size={props.size}
                                                          onLabelChange={(e) => {
                                                              setFormData({...formData, label: e.target.value})
                                                          }}
                                                          onDescriptionChange={(e) => setFormData({
                                                              ...formData,
                                                              description: e.target.value
                                                          })}
                                                          onContentChange={(e) => setFormData({
                                                              ...formData,
                                                              content: e.target.value
                                                          })}/>

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
