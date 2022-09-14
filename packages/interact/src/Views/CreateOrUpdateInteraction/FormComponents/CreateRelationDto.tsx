import {
    TagRelation,
    ContextRelation,
    FirstActRelation,
    IndirectObjectRelation, Interaction,
    ObjectRelation,
    ParallelRelation,
    PurposeRelation,
    ReferenceRelation,
    RelationTypes,
    RelationWeight,
    SecondActRelation,
    SettingRelation,
    SubjectRelation
} from "../../../BackEnd/grl-client/interact_db_client";

export type AnyRelation = ContextRelation | SubjectRelation | FirstActRelation | ObjectRelation | SecondActRelation | IndirectObjectRelation | SettingRelation | PurposeRelation | ParallelRelation | ReferenceRelation | TagRelation;



export class CreateRelationDto {
    content?: string;
    description?: string;
    hostInteractionId?: number;
    label?: string;
    linkedInteractionId: number | undefined = 0;
    relationType: RelationTypes | undefined = undefined;
    uuid?: string;
    weight: RelationWeight | undefined = undefined;
    hits?: number;
    order?: number;
    linkedInteraction: Interaction | undefined;

    public static fromRelation(relation: AnyRelation): CreateRelationDto {
        return {
            content: relation.content ?? undefined,
            description: relation.description ?? undefined,
            hostInteractionId: relation.hostInteractionId,
            label: relation.label ?? undefined,
            linkedInteractionId: relation.linkedInteractionId,
            relationType: relation.type,
            uuid: relation.uuid,
            weight: relation.weight,
            hits: relation.hits,
            order: relation.order,
            linkedInteraction: relation.linkedInteraction ?? undefined
        }
    }
}