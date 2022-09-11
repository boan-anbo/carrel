import {Input} from "@mantine/core";
import {ITextInputProps} from "./ITextInputProps";
import {KeyboardEvent} from "react";

export function TextInput(props: ITextInputProps) {

    function onInputKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        // if it's ctrl + enter, submit the form
        if (event.ctrlKey && event.key === 'Enter') {
            if (props.onSubmitForm) {
                props.onSubmitForm();
            }
        }
    }

    return <Input.Wrapper

        id={props.id}
        label={props.label}
        required={props.required}
        description={props.description}
        error={props.error}
        >
        <Input
            ref={props.focusRef}
            onKeyDown={onInputKeyDown}
            size={props.size}
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e: any) => props.onChange(e.currentTarget.value)}
        />
    </Input.Wrapper>;
}
