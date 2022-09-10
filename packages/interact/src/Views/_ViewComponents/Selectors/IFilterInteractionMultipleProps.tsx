import React, {ReactNode} from "react";
import {Interaction, InteractionIdentity} from "../../../BackEnd/clients/grl-client/interact_db_client";
import {FilterByEntityRelation} from "./FilterComponents/FilterByEntityRelation";
import {CreateRelationDto} from "../../CreateOrUpdateInteraction/FormComponents/CreateRelationDto";
import {SelectValue} from "../_ControlComponents/Select/SelectValue";
import {MantineSize} from "@mantine/core";

export interface IFilterInteractionMultipleProps<T> {
    description?: ReactNode;
    placeholder: string;
    style?: React.CSSProperties,
    /// Array of number ids of selected interactions
    onMultiSelectionChange: (value: SelectValue<T>[]) => void;
    label?: string;
    showConfirm?: boolean;
    onEntityCreated?: (interaction: Interaction) => void;
    allowCreateNewEntity?: boolean;
    onListFetched?: (interactions: Interaction[]) => void;
    createInteractionIdentity?: InteractionIdentity;
    // If this is provided, the filter will only query those interaction relations with the hostInteractionId and relationType
    filterByEntityRelation?: FilterByEntityRelation
    size?: MantineSize | undefined;
    currentValueDtos?: CreateRelationDto[];
}
