import {RelationTypes} from "../../../../BackEnd/clients/grl-client/interact_db_client";

export interface FilterByEntityRelation {
    hostId: number,
    relation: RelationTypes
}
