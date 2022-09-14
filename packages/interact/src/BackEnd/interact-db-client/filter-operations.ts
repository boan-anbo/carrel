import {getApolloClient} from "../../Services/get-apollo-client";
import {
    ContextRelationsConnection,
    FilterContextRelationByHostIdDocument,
    FilterContextRelationByHostIdQuery,
    FilterFirstActRelationByHostIdDocument,
    FilterFirstActRelationByHostIdQuery,
    FilterIndirectObjectRelationByHostIdDocument,
    FilterIndirectObjectRelationByHostIdQuery,
    FilterInteractionsByLabelDocument,
    FilterObjectRelationByHostIdDocument,
    FilterObjectRelationByHostIdQuery,
    FilterParallelRelationByHostIdDocument,
    FilterParallelRelationByHostIdQuery,
    FilterPurposeRelationByHostIdDocument,
    FilterPurposeRelationByHostIdQuery,
    FilterReferenceRelationByHostIdDocument,
    FilterReferenceRelationByHostIdQuery,
    FilterSecondActRelationByHostIdDocument,
    FilterSecondActRelationByHostIdQuery,
    FilterSettingRelationByHostIdDocument,
    FilterSettingRelationByHostIdQuery,
    FilterSubjectRelationByHostIdDocument,
    FilterSubjectRelationByHostIdQuery, FilterTagRelationByHostIdDocument, FilterTagRelationByHostIdQuery,
    FirstActRelationsConnection,
    GetInteractionFullDocument,
    GetInteractionFullQuery,
    GetInteractionsQuery,
    GetRecentInteractionsDocument,
    Interaction,
    ObjectRelationsConnection,
    RelationTypes,
    SubjectRelationsConnection
} from "../grl-client/interact_db_client";
import {DocumentNode} from "graphql/language";

export async function filterInteractions(label: string): Promise<Interaction[]> {
    const {data}: { data: GetInteractionsQuery } = await getApolloClient().query({
        query: FilterInteractionsByLabelDocument,
        variables: {
            labelFilter: label
        },
    });

    return data.interactions?.nodes as Interaction[] ?? [];
}


export async function getFullInteractionById(id: string | number): Promise<Interaction | null> {

    // parse id to number, and throw if it is not a number
    const interactionId = parseInt(id.toString());
    if (isNaN(interactionId)) {
        throw new Error(`Invalid interaction id: ${id}`);
    }
    const {data}: { data: GetInteractionFullQuery } = await getApolloClient().query({
        query: GetInteractionFullDocument,
        variables: {
            id: id
        },
    });
    return data.interactionFull.interaction as Interaction ?? null;
}

export async function getRecentInteractions(): Promise<Interaction[]> {
    const {data}: { data: GetInteractionsQuery } = await getApolloClient().query({
        query: GetRecentInteractionsDocument,
    });
    return data.interactions?.nodes as Interaction[] ?? [];
}


// Filter relations by its host id and relation types

export type RelationConnection =
    ContextRelationsConnection
    | SubjectRelationsConnection
    | ObjectRelationsConnection
    | FirstActRelationsConnection

export async function filterInteractionRelation(queryValue: string, filterByEntityRelation: { hostId: number; relation: RelationTypes }): Promise<RelationConnection> {

    let queryDocument: DocumentNode | undefined = undefined;

    switch (filterByEntityRelation.relation) {
        case RelationTypes.ContextRelation:
            queryDocument = FilterContextRelationByHostIdDocument;
            break;
        case RelationTypes.FirstActRelation:
            queryDocument = FilterFirstActRelationByHostIdDocument;
            break;
        case RelationTypes.IndirectObjectRelation:
            queryDocument = FilterIndirectObjectRelationByHostIdDocument;
            break;
        case RelationTypes.ObjectRelation:
            queryDocument = FilterObjectRelationByHostIdDocument;
            break;
        case RelationTypes.ParallelRelation:
            queryDocument = FilterParallelRelationByHostIdDocument;
            break;
        case RelationTypes.PurposeRelation:
            queryDocument = FilterPurposeRelationByHostIdDocument;
            break;
        case RelationTypes.ReferenceRelation:
            queryDocument = FilterReferenceRelationByHostIdDocument;
            break;
        case RelationTypes.SecondActRelation:
            queryDocument = FilterSecondActRelationByHostIdDocument;
            break;
        case RelationTypes.SettingRelation:
            queryDocument = FilterSettingRelationByHostIdDocument;
            break;
        case RelationTypes.SubjectRelation:
            queryDocument = FilterSubjectRelationByHostIdDocument;
            break;
        case RelationTypes.TagRelation:
            queryDocument = FilterTagRelationByHostIdDocument;
            break;

    }
    const {data} = await getApolloClient().query({
        query: queryDocument,
        variables: {
            hostId: filterByEntityRelation.hostId,
            query: queryValue
        },
    });

    console.log('data', data);
    switch (filterByEntityRelation.relation) {
        case RelationTypes.ContextRelation:
            return (data as FilterContextRelationByHostIdQuery).contextRelations as RelationConnection
        case RelationTypes.FirstActRelation:
            return (data as FilterFirstActRelationByHostIdQuery).firstActRelations as RelationConnection
        case RelationTypes.IndirectObjectRelation:
            return (data as FilterIndirectObjectRelationByHostIdQuery).indirectObjectRelations as RelationConnection
        case RelationTypes.ObjectRelation:
            return (data as FilterObjectRelationByHostIdQuery).objectRelations as RelationConnection
        case RelationTypes.ParallelRelation:
            return (data as FilterParallelRelationByHostIdQuery).parallelRelations as RelationConnection

        case RelationTypes.PurposeRelation:
            return (data as FilterPurposeRelationByHostIdQuery).purposeRelations as RelationConnection
        case RelationTypes.ReferenceRelation:
            return (data as FilterReferenceRelationByHostIdQuery).referenceRelations as RelationConnection
        case RelationTypes.SecondActRelation:
            return (data as FilterSecondActRelationByHostIdQuery).secondActRelations as RelationConnection
        case RelationTypes.SettingRelation:
            return (data as FilterSettingRelationByHostIdQuery).settingsRelations as RelationConnection
        case RelationTypes.SubjectRelation:
            return (data as FilterSubjectRelationByHostIdQuery).subjectRelations as RelationConnection
        case RelationTypes.TagRelation:
            return (data as FilterTagRelationByHostIdQuery).tagRelations as RelationConnection

    }
}
