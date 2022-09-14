import {DatePicker} from '@mantine/dates';
import {MantineSize} from "@mantine/core";
import {IconCalendar} from "@tabler/icons";
import {KeyboardEvent} from "react";

interface IDatePickerProps {
    disabled?: boolean;
    clearable?: boolean;
    readOnly?: boolean;
    description?: string;
    value: Date | null;
    placeholder?: string;
    label?: string;
    withAsterisk?: boolean;
    allowFreeInput?: boolean;
    onChange?: (value: Date | null) => void;
    size?: MantineSize;
    defaultValue?: Date| null;
    onSubmitForm: () => void;
}

export function InteractDatePicker(props: IDatePickerProps) {

    function onDatePickerKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        // if it's control + enter, submit the form
        if (event.ctrlKey && event.key === 'Enter') {
            props.onSubmitForm();
        }
    }

    return <DatePicker
        size={props.size}
        // the date
        onKeyDown={onDatePickerKeyDown}
        clearable={props.clearable}
        defaultValue={(props.defaultValue ?? props.value)}
        allowFreeInput={props.allowFreeInput}
        value={props.value}
        disabled={props.disabled}
        icon={<IconCalendar size={16} />}
        description={props.description}
        placeholder={props.placeholder}
        label={props.label}
        withAsterisk={props.withAsterisk}
        readOnly={props.readOnly}
        onChange={props.onChange}
    />;
}
