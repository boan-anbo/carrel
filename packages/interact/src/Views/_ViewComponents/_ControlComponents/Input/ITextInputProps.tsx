import {MantineSize} from "@mantine/core";

export interface ITextInputProps {
    onSubmitForm?: () => void;
    required?: boolean;
    size?: MantineSize
    value?: string;
    label?: string;
    description?: string;
    error?: string;
    placeholder?: string;
    focusRef?: any;
    id?: string;
    onChange: (e: string) => void;
}
