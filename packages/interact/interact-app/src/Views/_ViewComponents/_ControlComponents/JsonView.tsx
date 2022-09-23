import { JsonInput } from '@mantine/core';


export function JsonView(props: {
    json: string;
    minRows?: number;
    placeholder?: string;
    label?: string;
}) {
    return (
        <JsonInput
            value={props.json}
            label={props.label}
            placeholder={props.placeholder}
            validationError="Invalid json"
            formatOnBlur
            autosize
            minRows={props.minRows}
        />
    );
}
