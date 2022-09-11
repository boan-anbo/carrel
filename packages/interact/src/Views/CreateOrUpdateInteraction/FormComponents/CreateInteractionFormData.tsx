import {
    CategoryRelation,
    ContextRelation,
    FirstActRelation,
    IndirectObjectRelation,
    Interaction,
    InteractionIdentity,
    ObjectRelation,
    ParallelRelation,
    PurposeRelation,
    ReferenceRelation,
    RelationTypes,
    SecondActRelation,
    SettingRelation,
    SubjectRelation
} from "../../../BackEnd/grl-client/interact_db_client";
import {CreateRelationDto} from "./CreateRelationDto";
import {Logger, LogSource} from "../../../Services/logger";

const log = new Logger(LogSource.CreateFormData)

export class CreateInteractionFormData {
    id?: number = 0;
    uuid: string | null = null;
    label: string = '';
    description: string = '';
    content: string = '';
    sentence: string = '';
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
    categoryDtos: CreateRelationDto[] = [];
    allInteractions: Interaction[] = [];




    validateOrThrow() {
        // check if all dtos has the corresponding relation type
        const errors: Error[] = [];
        this.contextDtos.some(dto => dto.relationType !== RelationTypes.ContextRelation) && errors.push(new Error('contextDtos has wrong relation type'));
        this.firstActDtos.some(dto => dto.relationType !== RelationTypes.FirstActRelation) && errors.push(new Error('firstActDtos has wrong relation type'));
        this.secondActDtos.some(dto => dto.relationType !== RelationTypes.SecondActRelation) && errors.push(new Error('secondActDtos has wrong relation type'));
        this.indirectObjectDtos.some(dto => dto.relationType !== RelationTypes.IndirectObjectRelation) && errors.push(new Error('indirectObjectDtos has wrong relation type'));
        this.objectDtos.some(dto => dto.relationType !== RelationTypes.ObjectRelation) && errors.push(new Error('objectDtos has wrong relation type'));
        this.parallelDtos.some(dto => dto.relationType !== RelationTypes.ParallelRelation) && errors.push(new Error('parallelDtos has wrong relation type'));
        this.purposeDtos.some(dto => dto.relationType !== RelationTypes.PurposeRelation) && errors.push(new Error('purposeDtos has wrong relation type'));
        this.referenceDtos.some(dto => dto.relationType !== RelationTypes.ReferenceRelation) && errors.push(new Error('referenceDtos has wrong relation type'));
        this.settingDtos.some(dto => dto.relationType !== RelationTypes.SettingRelation) && errors.push(new Error('settingDtos has wrong relation type'));
        this.subjectDtos.some(dto => dto.relationType !== RelationTypes.SubjectRelation) && errors.push(new Error('subjectDtos has wrong relation type'));
        this.categoryDtos.some(dto => dto.relationType !== RelationTypes.CategoryRelation) && errors.push(new Error('categoryDtos has wrong relation type'));
        if (errors.length > 0) {
            errors.forEach(e => log.error(e.message, 'corrupted interaction data', this));
        }
    }

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
        interaction.categories?.forEach((categoryRelation) => categoryRelation?.linkedInteraction && allInteractions.push(categoryRelation.linkedInteraction));

        const newEntity = Object.assign(new CreateInteractionFormData(), {
            id: interaction.id,
            uuid: interaction.uuid,
            label: interaction.label ?? '',
            description: interaction.description ?? '',
            content: interaction.content ?? '',
            identity: interaction.identity,
            sentence: interaction.sentence ?? '',
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
            categoryDtos: interaction.categories?.map(r => CreateRelationDto.fromRelation(r as CategoryRelation)) ?? [],
            allInteractions: allInteractions
        } as CreateInteractionFormData);
        newEntity.validateOrThrow();
        return newEntity;
    }

    static validateOrThrow(createDto: Partial<CreateInteractionFormData>) {
        const newCreateDto = Object.assign(new CreateInteractionFormData(), createDto);
        newCreateDto.validateOrThrow();
    }
}
