import {Input} from "@mantine/core";
import {TextInputProps} from "./TextInputProps";

export function TextInput(props: TextInputProps) {
    return <Input.Wrapper
        id={props.id}
        label={props.label}
        required={props.required}
        description={props.description}
        error={props.error}
    >
        <Input
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e: any) => props.onChange(e.currentTarget.value)}
        />
    </Input.Wrapper>;
}
