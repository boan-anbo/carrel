import React, {FocusEvent} from "react";
import {MultiSelectValue} from "./MultiSelectValue";
import {Interaction} from "../../../../BackEnd/grl-client/interact_db_client";
import {MantineSize, Select} from "@mantine/core";

interface SingleSelectControlProps {
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onDropdownOpen: () => void;
    value: string | null;
    placeholder: string;
    style: React.CSSProperties | undefined;
    onChange: (selectedId: string) => void;
    data: MultiSelectValue<Interaction>[];
    size?: MantineSize
}

export function SingleSelectControl(props: SingleSelectControlProps) {

    return <Select
        size={props.size}
        onBlur={props.onBlur}
        onDropdownOpen={props.onDropdownOpen}
        clearable
        searchable
        value={props.value}
        placeholder={props.placeholder}
        style={props.style}
        creatable
        onChange={props.onChange}
        data={props.data}>


    </Select>;
}
