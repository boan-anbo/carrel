import {MantineSize} from "@mantine/core";

export interface TextInputProps {
    required?: boolean;
    size?: MantineSize
    value?: string;
    label?: string;
    description?: string;
    error?: string;
    placeholder?: string;
    id?: string;
    onChange: (e: string) => void;
}
