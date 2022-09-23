import {Interaction, RelationTypes} from "../../../../BackEnd/grl-client/interact_db_client";
import {
    filterInteractionRelation,
    filterInteractions
} from "../../../../BackEnd/interact-db-client/query-operations";
import {SelectValue} from "../../_ControlComponents/Select/SelectValue";
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
