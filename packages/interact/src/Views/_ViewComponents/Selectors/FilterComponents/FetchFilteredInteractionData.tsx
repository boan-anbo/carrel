import {Interaction, RelationTypes} from "../../../../BackEnd/clients/grl-client/interact_db_client";
import {
    filterInteractionRelation,
    filterInteractions
} from "../../../../BackEnd/clients/interact-db-client/filter-operations";
import {SelectValue} from "./SelectValue";
import {Logger, LogSource} from "../../../../Services/logger";

const log = new Logger(LogSource.FetchFilteredInteractionData)
export const fetchFilteredInteractionData = async (
    value: string,
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
    return filteredData.map((interaction: Interaction, index) => {
        return new SelectValue<Interaction>(
            index,
            interaction.label,
            interaction.id.toString(),
            interaction
        )
    });
};
