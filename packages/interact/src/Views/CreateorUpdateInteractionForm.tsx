import {Button, Form, Input, Radio} from "antd";
import {useState} from "react";
import {
    Interaction,
    InteractionIdentity,
    RelationTypes,
    RelationWeight,
    Scalars
} from "../clients/grl-client/interact_db_client";
import {
    createInteractionEntity,
    createOrUpdateInteraction,
} from "../clients/interact-db-client/create-interaction-entity";
import {notify} from "../utils/toast/notify";
import {selectInteraction} from "../features/app-state/appStateSlice";
import {useDispatch} from "react-redux";
import FilterInteractionSingleProps from "../db-gadgets/FilterInteractionSingleProps";
import {SelectValue} from "../db-gadgets/FilterInteractionSingle";

export interface CreateRelationDto {
    content?: string;
    description?: string;
    hostInteractionId?: number;
    id?: number;
    label?: string;
    linkedInteractionId: number;
    relationType: RelationTypes;
    uuid?: string;
    weight: RelationWeight;

}

export class CreateInteractionFormData {

    id?: number
    uuid: string | null;

    label: string = '';
    description: string = '';
    content: string = '';
    identity: InteractionIdentity = InteractionIdentity.Entity

    contextIds: CreateRelationDto[] = [];
    end: number = 0;
    firstActId: number = 1;
    indirectObjectIds: CreateRelationDto[] = [];
    objectIds: CreateRelationDto[] = [];
    parallelIds: CreateRelationDto[] = [];
    propertyIds: [] = [];
    purposeIds: CreateRelationDto[] = [];
    referenceIds: CreateRelationDto[] = [];
    secondActId: number  = 1;
    settingIds: CreateRelationDto[] = [];

    start: long = 0;

    subjectIds: CreateRelationDto[] = [];

}


export const CreateOrUpdateInteractionForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [formData, setFormData] = useState<CreateInteractionFormData>(
        new CreateInteractionFormData()
    )


    async function onFormFinish(values: any) {
        const {label, description, content, identity} = values;
        console.log(values)
        const result = await createOrUpdateInteraction(formData);

        console.log("Form receiveed", result)
        if (result.id) {
            notify('Created interaction entity', `${result.label} (click to show)`, 'success',
                () => {

                    dispatch(
                        selectInteraction(result)
                    )
                }
            )
        }
    }

    function onFormValuesChange(changedValues: any, values: any) {
        console.log(changedValues)
        setFormData(values)
    }

    const SelectedInteractionToRelationDto = (selectedInteraction: SelectValue<Interaction>[], relationType: RelationTypes): CreateRelationDto[] => {
        return selectedInteraction.map((value) => {
            return {
                linkedInteractionId: value.data.id,
                relationType: relationType,
                weight: RelationWeight.NotImportant,
            }
        })
    }

    const onInteractionSelect = (e: SelectValue<Interaction>[], SubjectRelation: RelationTypes) => {
        console.log("Ready to load payload", e, SubjectRelation)
        const createDtos =  SelectedInteractionToRelationDto(e, SubjectRelation)
        switch (SubjectRelation) {
            case RelationTypes.ContextRelation:
                setFormData({...formData, contextIds: createDtos})
                break;
            case RelationTypes.IndirectObjectRelation:
                setFormData({...formData, indirectObjectIds: createDtos})
                break;
            case RelationTypes.ObjectRelation:
                setFormData({...formData, objectIds: createDtos})
                break;
            case RelationTypes.ParallelRelation:
                setFormData({...formData, parallelIds: createDtos})
                break;
            case RelationTypes.PurposeRelation:
                setFormData({...formData, purposeIds: createDtos})
                break;
            case RelationTypes.ReferenceRelation:
                setFormData({...formData, referenceIds: createDtos})
                break;
            case RelationTypes.SettingRelation:
                setFormData({...formData, settingIds: createDtos})
                break;
            case RelationTypes.SubjectRelation:
                setFormData({...formData, subjectIds: createDtos})
                break;
        }
    }


    return (
        <div onMouseDown={e => e.stopPropagation()}>
            // pretty json
            <pre>{JSON.stringify(formData, null, 2)}</pre>
            <Form
                form={form}
                layout="vertical"
                initialValues={formData}
                onFinish={onFormFinish}
                onValuesChange={onFormValuesChange}>

                {formData.id && <Form.Item name="id" label="Id*" tooltip="Existing interaction. This will perform update."/>}

                <Form.Item label={`Identity: ${formData.identity.toLowerCase()}`} name="identity">
                    <Radio.Group size={'small'}>
                        <Radio.Button value={InteractionIdentity.Entity}>Entity</Radio.Button>
                        <Radio.Button value={InteractionIdentity.Interaction}>Interaction</Radio.Button>
                        <Radio.Button value={InteractionIdentity.Source}>Source</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Label"
                           rules={
                               [
                                   {
                                       required: true,
                                       message: 'Label must be at least 2 characters',
                                       min: 2
                                   }
                               ]
                           }
                           required
                           name="label"
                           tooltip="The name for new interaction entity">
                    <Input placeholder="Label"/>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name={"description"}
                    tooltip={{title: 'Tooltip with customize icon'}}
                >
                    <Input placeholder="Description"/>
                </Form.Item>

                <Form.Item
                    label="Content"
                    name="content"
                    tooltip={{title: 'Tooltip with customize icon'}}
                >
                    <Input placeholder="Content"/>
                </Form.Item>


                <FilterInteractionSingleProps
                    label='Contexts'
                    placeholder={'Context interactions'} style={{width: '100%'}} onSelect={
                    (e) =>  onInteractionSelect(e, RelationTypes.ContextRelation)
                }></FilterInteractionSingleProps>

                <FilterInteractionSingleProps
                    label='Subjects'
                    placeholder={'subject interactions'} style={{width: '100%'}} onSelect={
                    (e) =>  onInteractionSelect(e, RelationTypes.SubjectRelation)
                }></FilterInteractionSingleProps>

                <FilterInteractionSingleProps
                    label='Objects'
                    placeholder={'Object interactions'} style={{width: '100%'}} onSelect={
                    (e) =>  onInteractionSelect(e, RelationTypes.ObjectRelation)
                }></FilterInteractionSingleProps>

                <FilterInteractionSingleProps
                    label='Indirect Objects'
                    placeholder={'Indirect object interactions'} style={{width: '100%'}} onSelect={
                    (e) =>  onInteractionSelect(e, RelationTypes.IndirectObjectRelation)
                }></FilterInteractionSingleProps>

                <FilterInteractionSingleProps
                    label='Settings'
                    placeholder={'Settings interactions'} style={{width: '100%'}} onSelect={
                    (e) =>  onInteractionSelect(e, RelationTypes.SettingRelation)
                }></FilterInteractionSingleProps>


                <FilterInteractionSingleProps
                    label='Purposes'
                    placeholder={'Purpose interactions'} style={{width: '100%'}} onSelect={
                    (e) =>  onInteractionSelect(e, RelationTypes.PurposeRelation)
                }></FilterInteractionSingleProps>

                <FilterInteractionSingleProps
                    label='Parallels'
                    placeholder={'Parallel interactions'} style={{width: '100%'}} onSelect={
                    (e) =>  onInteractionSelect(e, RelationTypes.ParallelRelation)
                }></FilterInteractionSingleProps>

                <FilterInteractionSingleProps
                    label='References'
                    placeholder={'reference interactions'} style={{width: '100%'}} onSelect={
                    (e) =>  onInteractionSelect(e, RelationTypes.ReferenceRelation)
                }></FilterInteractionSingleProps>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>

            </Form>
        </div>
    );
}
