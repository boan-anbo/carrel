import {AsRelationTypes, Interaction, RelationTypes} from "../../../../BackEnd/clients/grl-client/interact_db_client";
import {filterInteractionRelation, filterInteractions} from "../../../../BackEnd/clients/interact-db-client/filter-operations";
import {SelectValue} from "./SelectValue";
import {MultiSelectValue} from "../FilterInteractionMultiple";

export const fetchFilteredInteractionData = async (
    value: string,
    callback: (value: (((prevState: MultiSelectValue[]) => MultiSelectValue[]) | MultiSelectValue[])) => void,
    sortByCounts?: undefined,
    filterByEntityRelation?: { hostId: number; relation: RelationTypes } | undefined) => {

    const shouldFilterByEntityRelation = filterByEntityRelation !== undefined;
    // Get filtered interactions from backend
    let filteredData: Interaction[];
    if (shouldFilterByEntityRelation) {
        const connection = await filterInteractionRelation(value, filterByEntityRelation);
        filteredData = connection.nodes?.map(relation => relation.linkedInteraction as Interaction) ?? [];
    } else {
        filteredData = await filterInteractions(value);
    }
    let data = filteredData.map((interaction: Interaction) => {
        return {
            label: interaction.label,
            value: interaction.id.toString(),
            data: interaction
        } as SelectValue<Interaction>;
    });
    callback(data);

};
