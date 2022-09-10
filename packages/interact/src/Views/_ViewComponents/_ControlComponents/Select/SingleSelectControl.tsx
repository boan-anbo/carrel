import React, {FocusEvent} from "react";
import {MultiSelectValue} from "./MultiSelectValue";
import {Interaction} from "../../../../BackEnd/clients/grl-client/interact_db_client";
import {Select} from "@mantine/core";

interface SingleSelectControlProps {
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onDropdownOpen: () => void;
    value: string | null;
    placeholder: string;
    style: React.CSSProperties | undefined;
    onChange: (selectedId: string) => void;
    data: MultiSelectValue<Interaction>[];
}

export function SingleSelectControl(props: SingleSelectControlProps) {

    return <Select
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
