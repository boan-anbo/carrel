import {MantineSize} from "@mantine/core";

export interface ITextInputProps {
    onPressEnter?: (e: string) => void;
    onPressCtrlEnter?: () => void;
    required?: boolean;
    disabled?: boolean;
    size?: MantineSize
    value?: string;
    label?: string;
    description?: string;
    error?: string;
    placeholder?: string;
    focusRef?: any;
    id?: string;
    onChange?: (e: string) => void;
}
