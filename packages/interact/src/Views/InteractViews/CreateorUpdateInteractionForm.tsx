import {Button, Form, Input, Radio} from "antd";
import {useState} from "react";
import {InteractionIdentity, RelationTypes, RelationWeight} from "../../clients/grl-client/interact_db_client";
import {createOrUpdateInteraction,} from "../../clients/interact-db-client/create-interaction-entity";
import {notify} from "../../utils/toast/notify";
import {selectInteraction} from "../../features/app-state/appStateSlice";
import {useDispatch} from "react-redux";
import FilterInteractionMultiple from "../../db-gadgets/FilterInteractionMultiple";
import {set} from "react-hook-form";
import {SizeType} from "antd/lib/config-provider/SizeContext";

export interface CreateRelationDto {
    content?: string;
    description?: string;
    hostInteractionId?: number;
    label?: string;
    linkedInteractionId: number;
    relationType: RelationTypes;
    uuid?: string;
    weight: RelationWeight;
    hits?: number;
    order?: number;

}

export class CreateInteractionFormData {

    id?: number = 0;
    uuid: string | null = null;

    label: string = '';
    description: string = '';
    content: string = '';
    identity: InteractionIdentity = InteractionIdentity.Entity
    contextDtos: CreateRelationDto[] = [];
    end: Date | null = null;
    firstActDtos: CreateRelationDto[] = [];
    secondActDtos: CreateRelationDto[] = [];
    indirectObjectDtos: CreateRelationDto[] = [];
    objectDtos: CreateRelationDto[] = [];
    parallelDtos: CreateRelationDto[] = [];
    purposeDtos: CreateRelationDto[] = [];
    referenceDtos: CreateRelationDto[] = [];
    settingDtos: CreateRelationDto[] = [];
    start: Date | null = null;
    subjectDtos: CreateRelationDto[] = [];

}


export const CreateOrUpdateInteractionForm = (props: {
    size: SizeType | undefined,
}) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [showRawJson, setShowRawJson] = useState(false);

    const [formData, setFormData] = useState<CreateInteractionFormData>(
        new CreateInteractionFormData()
    )


    const clearFormData = () => {
        setFormData(new CreateInteractionFormData());
    }

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
        // clear form
        clearFormData();
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
            <button onClick={() => setShowRawJson(!showRawJson)}>Toggle Raw Json</button>
            {showRawJson && <pre>{JSON.stringify(formData, null, 2)}</pre>}
            <Form
                className={'px-4'}
                size={props.size}
                form={form}
                title={'Create Interaction'}
                layout="vertical"
                initialValues={formData}
                onFinish={onFormFinish}
                onValuesChange={onFormValuesChange}>

                {formData.id &&
                    <Form.Item name="id" label="Id*" tooltip="Existing interaction. This will perform update."/>}

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
                           tooltip="The name for new interaction entity">
                    <Input placeholder="Label"
                           value={formData.label}
                           size={props.size}
                           onChange={(e) => {
                               setFormData({...formData, label: e.target.value})
                           }}
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    tooltip={{title: 'Tooltip with customize icon'}}
                >
                    <Input
                        value={formData.description}
                        size={props.size}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Description"/>
                </Form.Item>
                <Form.Item

                    label="Content"
                    tooltip={{title: 'Tooltip with customize icon'}}
                >
                    <Input
                        size={props.size}
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        placeholder="Content"/>
                </Form.Item>

                {/*Relation inputs*/}
                <FilterInteractionMultiple
                    label='Contexts'
                    size={props.size}
                    placeholder={'Context interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.ContextRelation)
                }></FilterInteractionMultiple>

                <FilterInteractionMultiple
                    label='Subjects'
                    size={props.size}
                    placeholder={'subject interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.SubjectRelation)
                }></FilterInteractionMultiple>

                {/*Controls for first act*/}
                <FilterInteractionMultiple
                    label='First Acts'
                    size={props.size}
                    createInteractionIdentity={InteractionIdentity.Act}
                    placeholder={'First act interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.FirstActRelation)
                }></FilterInteractionMultiple>


                <FilterInteractionMultiple
                    label='Objects'
                    size={props.size}
                    placeholder={'Object interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.ObjectRelation)
                }></FilterInteractionMultiple>

                {/*Controls for second act*/}
                <FilterInteractionMultiple
                    label='Second Acts'
                    size={props.size}
                    createInteractionIdentity={InteractionIdentity.Act}
                    placeholder={'Second act interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.SecondActRelation)
                }></FilterInteractionMultiple>


                <FilterInteractionMultiple
                    label='Indirect Objects'
                    size={props.size}
                    placeholder={'Indirect object interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.IndirectObjectRelation)
                }></FilterInteractionMultiple>

                <FilterInteractionMultiple
                    label='Settings'
                    size={props.size}
                    placeholder={'Settings interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.SettingRelation)
                }></FilterInteractionMultiple>


                <FilterInteractionMultiple
                    label='Purposes'
                    size={props.size}
                    placeholder={'Purpose interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.PurposeRelation)
                }></FilterInteractionMultiple>

                <FilterInteractionMultiple
                    label='Parallels'
                    size={props.size}
                    placeholder={'Parallel interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.ParallelRelation)
                }></FilterInteractionMultiple>

                <FilterInteractionMultiple
                    label='References'
                    size={props.size}
                    placeholder={'reference interactions'} style={{width: '100%'}} onSelect={
                    (e) => onInteractionSelect(e, RelationTypes.ReferenceRelation)
                }></FilterInteractionMultiple>

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
CreateOrUpdateInteractionForm.defaultProps = {
    size: 'small',
}
