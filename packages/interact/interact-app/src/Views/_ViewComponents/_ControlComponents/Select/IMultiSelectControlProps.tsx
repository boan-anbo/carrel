import React, {KeyboardEventHandler, ReactNode} from "react";
import {MultiSelectValue} from "./MultiSelectValue";
import {Interaction} from "../../../../BackEnd/grl-client/interact_db_client";
import {MantineSize} from "@mantine/core";
import {SelectItem} from "@mantine/core/lib/Select/types";

export interface IMultiSelectControlProps {
    onSearchChange?: (value: string) => void;
    clearSearchOnChange?: boolean;
    clearSearchOnBlur?: boolean;
    label?: ReactNode | undefined;
    value: string[];
    placeholder?: string;
    description?: ReactNode;
    style: React.CSSProperties | undefined;
    size?: MantineSize | undefined;
    getCreateLabel?: (query: string) => string;
    onCreate?: (query: string) => SelectItem | string | null | undefined;
    onChange: (selectedIds: string[]) => void;
    shouldCreate?: (query: string, data: SelectItem[]) => boolean;
    data: MultiSelectValue<Interaction>[];
    readOnly?: boolean;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}
