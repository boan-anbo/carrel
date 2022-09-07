import {Button, Form, Input, Radio} from "antd";
import {useState} from "react";
import {
    Interaction,
    InteractionIdentity,
    RelationTypes,
    RelationWeight,
    Scalars
} from "../../clients/grl-client/interact_db_client";
import {
    createInteractionEntity,
    createOrUpdateInteraction,
} from "../../clients/interact-db-client/create-interaction-entity";
import {notify} from "../../utils/toast/notify";
import {selectInteraction} from "../../features/app-state/appStateSlice";
import {useDispatch} from "react-redux";
import FilterInteractionMultiple from "../../db-gadgets/FilterInteractionMultiple";
import {SelectValue} from "../../db-gadgets/FilterInteractionSingle";

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
    uuid: string | null = null;

    label: string = '';
    description: string = '';
    content: string = '';
    identity: InteractionIdentity = InteractionIdentity.Entity

    contextDtos: CreateRelationDto[] = [];
    end: number = 0;
    firstActDtos: CreateRelationDto[] = [];
    secondActDtos: CreateRelationDto[] = [];
    indirectObjectDtos: CreateRelationDto[] = [];
    objectDtos: CreateRelationDto[] = [];
    parallelDtos: CreateRelationDto[] = [];
    propertyIds: [] = [];
    purposeDtos: CreateRelationDto[] = [];
    referenceDtos: CreateRelationDto[] = [];
    settingDtos: CreateRelationDto[] = [];

    start: number = 0;

    subjectDtos: CreateRelationDto[] = [];

}


export const CreateOrUpdateInteractionForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [formData, setFormData] = useState<CreateInteractionFormData>(
        new CreateInteractionFormData()
    )


    async function onFormFinish(values: any) {
        console.log(values)
        const result = await createOrUpdateInteraction(formData);

        console.log("Form receiveed", result)
        if (result.id) {
            notify('Created interaction entity', `${result.label} (click to show)`, 'success',
                () => {
                    dispatch(selectInteraction(null))
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

    const SelectedInteractionToRelationDto = (selectedInteractionIds: string[], relationType: RelationTypes): CreateRelationDto[] => {
        return selectedInteractionIds.map((id) => {
            return {
                linkedInteractionId: parseInt(id, 10),
                relationType: relationType,
                weight: RelationWeight.NotImportant,
            }
        })
    }

    const onInteractionSelect = (e: string[], SubjectRelation: RelationTypes) => {
        console.log("Ready to load payload", e, SubjectRelation)
        const createDtos = SelectedInteractionToRelationDto(e, SubjectRelation)
        switch (SubjectRelation) {
            case RelationTypes.ContextRelation:
                setFormData({...formData, contextDtos: createDtos})
                break;
            case RelationTypes.SubjectRelation:
                setFormData({...formData, subjectDtos: createDtos})
                break;
            case RelationTypes.FirstActRelation:
                setFormData({...formData, firstActDtos: createDtos})
                break;
            case RelationTypes.ObjectRelation:
                setFormData({...formData, objectDtos: createDtos})
                break;
            case RelationTypes.SecondActRelation:
                setFormData({...formData, secondActDtos: createDtos})
                break;
            case RelationTypes.IndirectObjectRelation:
                setFormData({...formData, indirectObjectDtos: createDtos})
                break;
            case RelationTypes.ParallelRelation:
                setFormData({...formData, parallelDtos: createDtos})
                break;
            case RelationTypes.PurposeRelation:
                setFormData({...formData, purposeDtos: createDtos})
                break;
            case RelationTypes.ReferenceRelation:
                setFormData({...formData, referenceDtos: createDtos})
                break;
            case RelationTypes.SettingRelation:
                setFormData({...formData, settingDtos: createDtos})
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

                {formData.id &&
                    <Form.Item name="id" label="Id*" tooltip="Existing interaction. This will perform update."/>}

                <Form.Item label={`Identity: ${formData.identity.toLowerCase()}`} name="identity">
                    <Radio.Group size={'small'}>
                        <Radio.Button value={InteractionIdentity.Act}>Act</Radio.Button>
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


                <FilterInteractionMultiple
                    label='Contexts'
                    placeholder={'Context interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.ContextRelation)
                }></FilterInteractionMultiple>

                <FilterInteractionMultiple
                    label='Subjects'
                    placeholder={'subject interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.SubjectRelation)
                }></FilterInteractionMultiple>

                {/*Controls for first act*/}
                <FilterInteractionMultiple
                    label='First Acts'
                    defaultInteractionType={InteractionIdentity.Act}
                    placeholder={'First act interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.FirstActRelation)
                }></FilterInteractionMultiple>


                <FilterInteractionMultiple
                    label='Objects'
                    placeholder={'Object interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.ObjectRelation)
                }></FilterInteractionMultiple>

                {/*Controls for second act*/}
                 <FilterInteractionMultiple
                    label='Second Acts'
                    defaultInteractionType={InteractionIdentity.Act}
                    placeholder={'Second act interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.SecondActRelation)
                }></FilterInteractionMultiple>


                <FilterInteractionMultiple
                    label='Indirect Objects'
                    placeholder={'Indirect object interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.IndirectObjectRelation)
                }></FilterInteractionMultiple>

                <FilterInteractionMultiple
                    label='Settings'
                    placeholder={'Settings interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.SettingRelation)
                }></FilterInteractionMultiple>


                <FilterInteractionMultiple
                    label='Purposes'
                    placeholder={'Purpose interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.PurposeRelation)
                }></FilterInteractionMultiple>

                <FilterInteractionMultiple
                    label='Parallels'
                    placeholder={'Parallel interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.ParallelRelation)
                }></FilterInteractionMultiple>

                <FilterInteractionMultiple
                    label='References'
                    placeholder={'reference interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.ReferenceRelation)
                }></FilterInteractionMultiple>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>

            </Form>
        </div>
    );
}
