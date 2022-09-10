import React from "react";
import {Interaction, InteractionIdentity} from "../../../../BackEnd/clients/grl-client/interact_db_client";
import {FilterByEntityRelation} from "./FilterByEntityRelation";
import {SizeType} from "antd/lib/config-provider/SizeContext";
import {CreateRelationDto} from "../../../InteractViews/CreatOrUpdateInteractionForm/FormComponents/CreateRelationDto";
import {SelectValue} from "./SelectValue";

export interface IFilterInteractionMultipleProps<T> {
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
    showLabel?: boolean;
    size?: SizeType | undefined;
    currentValueDtos?: CreateRelationDto[];
}
