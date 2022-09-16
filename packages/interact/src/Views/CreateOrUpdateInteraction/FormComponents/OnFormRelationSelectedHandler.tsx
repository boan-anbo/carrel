import {Interaction, RelationTypes, RelationWeight} from "../../../BackEnd/grl-client/interact_db_client";
import {CreateRelationDto} from "./CreateRelationDto";
import {CreateOrUpdateInteractionForm} from "./CreateOrUpdateInteractionForm";
import {Dispatch, SetStateAction} from "react";
import {Logger, LogSource} from "../../../Services/logger";
import {SelectValue} from "../../_ViewComponents/_ControlComponents/Select/SelectValue";

/**
 * Handles all emited changes by the CreateOrUpdateInteractionForm
 *
 */
const log = new Logger(LogSource.OnFormRelationSelectedHandler)
// this updates the form data with the selected interactions (in relation to the host interaction)
export const onFormRelationSelectedHandler = (
    selectValues: SelectValue<Interaction>[],
    relations: RelationTypes,
    formData: CreateOrUpdateInteractionForm,
    setFormData: Dispatch<SetStateAction<CreateOrUpdateInteractionForm>>) => {
    log.info("onFormRelationSelectedHandler", 'Provided selection data', {
        selectValues,
        relations,
        formData,
        setFormData
    });
    const createDtos = SelectedInteractionToRelationDto(selectValues, relations)

    switch (relations) {
        case RelationTypes.ContextRelation:
            setFormData({...formData, contextDtos: createDtos} as CreateOrUpdateInteractionForm);
            break;
        case RelationTypes.TagRelation:
            setFormData({...formData, tagDtos: createDtos} as CreateOrUpdateInteractionForm);
            break;
        case RelationTypes.SubjectRelation:
            setFormData({...formData, subjectDtos: createDtos} as CreateOrUpdateInteractionForm);
            break;
        case RelationTypes.FirstActRelation:
            setFormData({...formData, firstActDtos: createDtos} as CreateOrUpdateInteractionForm);
            break;
        case RelationTypes.ObjectRelation:
            setFormData({...formData, objectDtos: createDtos} as CreateOrUpdateInteractionForm);
            break;
        case RelationTypes.SecondActRelation:
            setFormData({...formData, secondActDtos: createDtos} as CreateOrUpdateInteractionForm);
            break;
        case RelationTypes.IndirectObjectRelation:
            setFormData({...formData, indirectObjectDtos: createDtos} as CreateOrUpdateInteractionForm);
            break;
        case RelationTypes.ParallelRelation:
            setFormData({...formData, parallelDtos: createDtos} as CreateOrUpdateInteractionForm);
            break;
        case RelationTypes.PurposeRelation:
            setFormData({...formData, purposeDtos: createDtos} as CreateOrUpdateInteractionForm);
            break;
        case RelationTypes.ReferenceRelation:
            setFormData({...formData, referenceDtos: createDtos} as CreateOrUpdateInteractionForm);
            break;
        case RelationTypes.SettingRelation:
            setFormData({...formData, settingDtos: createDtos} as CreateOrUpdateInteractionForm);
            break;
    }
}

/**
 * This handles any newly selected interactions by the relation MultiSelect in the Main Form.
 *
 *
 * This step has to check if the provided {@link SelectValue} has the {@link SelectValue.data} set, i.e. loaded with actual interaction.
 *
 * Otherwise, the next time, in the same session, this Relation DTO is feed back into the MultiSelect, it will not be able to display the label because it has to inherit the data from {@link CreateRelationDto.linkedInteraction}
 * @param selectValues
 * @param relationType
 * @constructor
 */
const SelectedInteractionToRelationDto = (selectValues: SelectValue<Interaction>[], relationType: RelationTypes): CreateRelationDto[] => {
    return selectValues.map((selectValue) => {
        const createRelationDto = new CreateRelationDto();
        createRelationDto.linkedInteractionId = parseInt(selectValue.value as string);
        createRelationDto.relationType = relationType;
        createRelationDto.weight = RelationWeight.NotImportant;
        createRelationDto.linkedInteraction = selectValue.data;
        return createRelationDto;
    })
}
