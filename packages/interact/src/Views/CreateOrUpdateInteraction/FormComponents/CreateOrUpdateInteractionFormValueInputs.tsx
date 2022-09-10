import {ChangeEvent} from "react";
import {CreateInteractionFormData} from "./CreateInteractionFormData";
import {TextInput} from "../../_ViewComponents/_ControlComponents/Input/TextInput";
import {MantineSize} from "@mantine/core";

interface CreateOrUpdateInteractionFormValueInputProps {
    formData: CreateInteractionFormData;
    size: MantineSize | undefined;
    onLabelChange: (e: string) => void;
    onDescriptionChange: (e: string) => void;
    onContentChange: (e: string) => void;
}

export function CreateOrUpdateInteractionFormValueInputs(props: CreateOrUpdateInteractionFormValueInputProps) {
    return <div className={'space-y-4 my-2'}>


        <TextInput label={'Label'}
                   required
                   size={props.size}
                   value={props.formData.label}
                   description={'Short and distinguishable label'}
                   onChange={props.onLabelChange}
        />

        <TextInput label={'Description'}
                   size={props.size}
                   value={props.formData.description}
                   description={'Meta-description'}
                   onChange={props.onDescriptionChange}
        />

        <TextInput label={'Content'}
                   size={props.size}
                   value={props.formData.content}
                   description={'Textual content'}
                   onChange={props.onContentChange}
        />


    </div>
        ;
}
