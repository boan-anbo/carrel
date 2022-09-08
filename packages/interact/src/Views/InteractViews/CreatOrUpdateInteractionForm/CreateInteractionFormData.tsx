import {
    ContextRelation,
    FirstActRelation,
    IndirectObjectRelation,
    Interaction,
    InteractionIdentity,
    ObjectRelation,
    ParallelRelation,
    PurposeRelation,
    ReferenceRelation,
    SecondActRelation,
    SettingRelation, SubjectRelation
} from "../../../clients/grl-client/interact_db_client";
import {CreateRelationDto} from "./CreateRelationDto";

export class CreateInteractionFormData {
    id?: number = 0;
    uuid: string | null = null;
    label: string = '';
    description: string = '';
    content: string = '';
    identity: InteractionIdentity = InteractionIdentity.Entity
    contextDtos: CreateRelationDto[] = [];
    end: Date | null = null;
    firstActDtos: CreateRelationDto[] = [];
    secondActDtos: CreateRelationDto[] = [];
    indirectObjectDtos: CreateRelationDto[] = [];
    objectDtos: CreateRelationDto[] = [];
    parallelDtos: CreateRelationDto[] = [];
    purposeDtos: CreateRelationDto[] = [];
    referenceDtos: CreateRelationDto[] = [];
    settingDtos: CreateRelationDto[] = [];
    start: Date | null = null;
    subjectDtos: CreateRelationDto[] = [];
    allInteractions: Interaction[] = [];

    // convert interaction to form data ready to be edited
    public static fromInteraction(interaction: Interaction): CreateInteractionFormData {
        const allInteractions: Interaction[] = [];
        interaction.contexts?.forEach((contextRelation) => contextRelation?.linkedInteraction && allInteractions.push(contextRelation.linkedInteraction));
        interaction.firstActs?.forEach((firstActRelation) => firstActRelation?.linkedInteraction && allInteractions.push(firstActRelation.linkedInteraction));
        interaction.secondActs?.forEach((secondActRelation) => secondActRelation?.linkedInteraction && allInteractions.push(secondActRelation.linkedInteraction));
        interaction.indirectObjects?.forEach((indirectObjectRelation) => indirectObjectRelation?.linkedInteraction && allInteractions.push(indirectObjectRelation.linkedInteraction));
        interaction.objects?.forEach((objectRelation) => objectRelation?.linkedInteraction && allInteractions.push(objectRelation.linkedInteraction));
        interaction.parallels?.forEach((parallelRelation) => parallelRelation?.linkedInteraction && allInteractions.push(parallelRelation.linkedInteraction));
        interaction.purposes?.forEach((purposeRelation) => purposeRelation?.linkedInteraction && allInteractions.push(purposeRelation.linkedInteraction));
        interaction.references?.forEach((referenceRelation) => referenceRelation?.linkedInteraction && allInteractions.push(referenceRelation.linkedInteraction));
        interaction.settings?.forEach((settingRelation) => settingRelation?.linkedInteraction && allInteractions.push(settingRelation.linkedInteraction));
        interaction.subjects?.forEach((subjectRelation) => subjectRelation?.linkedInteraction && allInteractions.push(subjectRelation.linkedInteraction));
        return {
            id: interaction.id,
            uuid: interaction.uuid,
            label: interaction.label ?? '',
            description: interaction.description ?? '',
            content: interaction.content ?? '',
            identity: interaction.identity,
            contextDtos: interaction.contexts?.map(r => CreateRelationDto.fromRelation(r as ContextRelation)) ?? [],
            end: interaction.end,
            firstActDtos: interaction.firstActs?.map(r => CreateRelationDto.fromRelation(r as FirstActRelation)) ?? [],
            secondActDtos: interaction.secondActs?.map(r => CreateRelationDto.fromRelation(r as SecondActRelation)) ?? [],
            indirectObjectDtos: interaction.indirectObjects?.map(r => CreateRelationDto.fromRelation(r as IndirectObjectRelation)) ?? [],
            objectDtos: interaction.objects?.map(r => CreateRelationDto.fromRelation(r as ObjectRelation)) ?? [],
            parallelDtos: interaction.parallels?.map(r => CreateRelationDto.fromRelation(r as ParallelRelation)) ?? [],
            purposeDtos: interaction.purposes?.map(r => CreateRelationDto.fromRelation(r as PurposeRelation)) ?? [],
            referenceDtos: interaction.references?.map(r => CreateRelationDto.fromRelation(r as ReferenceRelation)) ?? [],
            settingDtos: interaction.settings?.map(r => CreateRelationDto.fromRelation(r as SettingRelation)) ?? [],
            start: interaction.start,
            subjectDtos: interaction.subjects?.map(r => CreateRelationDto.fromRelation(r as SubjectRelation)) ?? [],
            allInteractions: allInteractions
        }

    }
}
