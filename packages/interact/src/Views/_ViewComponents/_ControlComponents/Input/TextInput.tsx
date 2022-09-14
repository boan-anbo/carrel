import {Input} from "@mantine/core";
import {ITextInputProps} from "./ITextInputProps";
import {KeyboardEvent, useState} from "react";

export function TextInput(props: ITextInputProps) {

    const [currentValue, setCurrentValue] = useState<string>('');

    function onInputKeyDown(event: KeyboardEvent<HTMLDivElement>) {

        // if it's ctrl + enter, submit the form
        if (event.ctrlKey && event.key === 'Enter') {
            if (props.onPressCtrlEnter) {
                props.onPressCtrlEnter();
            }
        }

        if (event.key === 'Enter') {
            if (props.onPressEnter) {
                props.onPressEnter(currentValue);
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

            disabled={props.disabled}
            ref={props.focusRef}
            onKeyDown={onInputKeyDown}
            size={props.size}
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e: any) => {
                if (props.onChange) {
                    props.onChange(e.currentTarget.value);
                }

                setCurrentValue(e.currentTarget.value);

            }}
        />
    </Input.Wrapper>;
}
