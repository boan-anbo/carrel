import {DatePicker} from '@mantine/dates';
import {MantineSize} from "@mantine/core";
import {IconCalendar} from "@tabler/icons";

interface IDatePickerProps {
    description?: string;
    value: Date | null;
    placeholder?: string;
    label?: string;
    withAsterisk?: boolean;
    allowFreeInput?: boolean;
    onChange?: (value: Date | null) => void;
    size?: MantineSize;
}

export function InteractDatePicker(props: IDatePickerProps) {

    return <DatePicker
        size={props.size}
        // the date
        defaultValue={props.value}
        allowFreeInput={props.allowFreeInput}
        value={props.value}
        icon={<IconCalendar size={16} />}
        description={props.description}
        placeholder={props.placeholder}
        label={props.label}
        withAsterisk={props.withAsterisk}
        onChange={props.onChange}
    />;
}
