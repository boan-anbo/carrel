import {Button, Form, Input, Radio} from "antd";
import {useState} from "react";
import {InteractionIdentity} from "../../clients/grl-client/interact_db_client";
import {createInteractionEntity,} from "../../clients/interact-db-client/create-interaction-entity";
import {notify} from "../../utils/toast/notify";
import {selectInteraction} from "../../features/app-state/appStateSlice";
import {useDispatch} from "react-redux";

interface CreateInteractionFormData {
    label: string;
    description: string;
    content: string;
    identity: InteractionIdentity
}

export const CreateInteractionEntityForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [formData, setFormData] = useState<CreateInteractionFormData>({
        identity: InteractionIdentity.Act,
        content: "", description: "", label: ""
    });


    async function onFormFinish(values: any) {
        const {label, description, content, identity} = values;
        console.log(values)
        const result = await createInteractionEntity(
            label,
            description,
            content,
        )


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

                <Form.Item label="Idenity" name="identity">
                    <Radio.Group>
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
                    <Input placeholder="input placeholder"/>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name={"description"}
                    tooltip={{title: 'Tooltip with customize icon'}}
                >
                    <Input placeholder="input placeholder"/>
                </Form.Item>

                <Form.Item
                    label="Content"
                    name="content"
                    tooltip={{title: 'Tooltip with customize icon'}}
                >
                    <Input placeholder="input placeholder"/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>

            </Form>
        </div>
    );
}
