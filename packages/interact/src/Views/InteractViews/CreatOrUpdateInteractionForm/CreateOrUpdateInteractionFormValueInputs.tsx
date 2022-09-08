import {SizeType} from "antd/lib/config-provider/SizeContext";
import {Form, Input} from "antd";
import {ChangeEvent} from "react";
import {CreateInteractionFormData} from "./CreateInteractionFormData";

interface CreateOrUpdateInteractionFormValueInputProps {
    formData: CreateInteractionFormData;
    size: SizeType | undefined;
    onLabelChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onDescriptionChange: (e:ChangeEvent<HTMLInputElement>) => void;
    onContentChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function CreateOrUpdateInteractionFormValueInputs(props: CreateOrUpdateInteractionFormValueInputProps) {
    return <>
        <Form.Item label="Label"
                   rules={
                       [
                           {
                               required: true,
                               message: "Label must be at least 2 characters",
                               min: 2
                           }
                       ]
                   }
                   required
                   tooltip="The name for new interaction entity">
            <Input placeholder="Label"
                   value={props.formData.label}
                   size={props.size}
                   onChange={props.onLabelChange}
            />
        </Form.Item>

        <Form.Item
            label="Description"
            tooltip={{title: "Tooltip with customize icon"}}
        >
            <Input
                value={props.formData.description}
                size={props.size}
                onChange={props.onDescriptionChange}
                placeholder="Description"/>
        </Form.Item>
        <Form.Item

            label="Content"
            tooltip={{title: "Tooltip with customize icon"}}
        >
            <Input
                size={props.size}
                value={props.formData.content}
                onChange={props.onContentChange}
                placeholder="Content"/>
        </Form.Item>
    </>;
}
