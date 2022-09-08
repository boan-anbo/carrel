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

    // convert interaction to form data ready to be edited
    public static fromInteraction(interaction: Interaction): CreateInteractionFormData {
        return {
            id: interaction.id,
            uuid: interaction.uuid,
            label: interaction.label ?? '',
            description: interaction.description ?? '',
            content: interaction.content ?? '',
            identity: interaction.identity,
            contextDtos: interaction.contexts?.map(r =>  CreateRelationDto.fromRelation(r as ContextRelation)) ?? [],
            end: interaction.end,
            firstActDtos: interaction.firstActs?.map(r =>  CreateRelationDto.fromRelation(r as FirstActRelation)) ?? [],
            secondActDtos: interaction.secondActs?.map(r =>  CreateRelationDto.fromRelation(r as SecondActRelation)) ?? [],
            indirectObjectDtos: interaction.indirectObjects?.map(r =>  CreateRelationDto.fromRelation(r as IndirectObjectRelation)) ?? [],
            objectDtos: interaction.objects?.map(r =>  CreateRelationDto.fromRelation(r as ObjectRelation)) ?? [],
            parallelDtos: interaction.parallels?.map(r =>  CreateRelationDto.fromRelation(r as ParallelRelation)) ?? [],
            purposeDtos: interaction.purposes?.map(r =>  CreateRelationDto.fromRelation(r as PurposeRelation)) ?? [],
            referenceDtos: interaction.references?.map(r =>  CreateRelationDto.fromRelation(r as ReferenceRelation)) ?? [],
            settingDtos: interaction.settings?.map(r =>  CreateRelationDto.fromRelation(r as SettingRelation)) ?? [],
            start: interaction.start,
            subjectDtos: interaction.subjects?.map(r =>  CreateRelationDto.fromRelation(r as SubjectRelation)) ?? [],
        }




    }
}
