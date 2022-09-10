import React, {ReactNode} from "react";
import {MultiSelectValue} from "./MultiSelectValue";
import {Interaction} from "../../../../BackEnd/clients/grl-client/interact_db_client";
import {MantineSize} from "@mantine/core";

export interface IMultiSelectControlProps {
    label?: ReactNode | undefined;
    value: string[];
    placeholder?: string;
    description?: ReactNode;
    style: React.CSSProperties | undefined;
    size?: MantineSize | undefined;
    createLabel: (query: string) => string;
    onCreate: (query: string) => { label: string; value: string };
    onChange: (selectedIds: string[]) => void;
    data: MultiSelectValue<Interaction>[];
}
