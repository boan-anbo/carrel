import {Interaction, RelationTypes, RelationWeight} from "../../../BackEnd/grl-client/interact_db_client";
import {CreateRelationDto} from "./CreateRelationDto";
import {CreateInteractionFormData} from "./CreateInteractionFormData";
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
    formData: CreateInteractionFormData,
    setFormData: Dispatch<SetStateAction<CreateInteractionFormData>>) => {
    log.info("onFormRelationSelectedHandler", 'Provided selection data', {
        selectValues,
        relations,
        formData,
        setFormData
    });
    const createDtos = SelectedInteractionToRelationDto(selectValues, relations)

    switch (relations) {
        case RelationTypes.ContextRelation:
            setFormData({...formData, contextDtos: createDtos} as CreateInteractionFormData);
            break;
        case RelationTypes.TagRelation:
            setFormData({...formData, tagDtos: createDtos} as CreateInteractionFormData);
            break;
        case RelationTypes.SubjectRelation:
            setFormData({...formData, subjectDtos: createDtos} as CreateInteractionFormData);
            break;
        case RelationTypes.FirstActRelation:
            setFormData({...formData, firstActDtos: createDtos} as CreateInteractionFormData);
            break;
        case RelationTypes.ObjectRelation:
            setFormData({...formData, objectDtos: createDtos} as CreateInteractionFormData);
            break;
        case RelationTypes.SecondActRelation:
            setFormData({...formData, secondActDtos: createDtos} as CreateInteractionFormData);
            break;
        case RelationTypes.IndirectObjectRelation:
            setFormData({...formData, indirectObjectDtos: createDtos} as CreateInteractionFormData);
            break;
        case RelationTypes.ParallelRelation:
            setFormData({...formData, parallelDtos: createDtos} as CreateInteractionFormData);
            break;
        case RelationTypes.PurposeRelation:
            setFormData({...formData, purposeDtos: createDtos} as CreateInteractionFormData);
            break;
        case RelationTypes.ReferenceRelation:
            setFormData({...formData, referenceDtos: createDtos} as CreateInteractionFormData);
            break;
        case RelationTypes.SettingRelation:
            setFormData({...formData, settingDtos: createDtos} as CreateInteractionFormData);
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
    return selectValues.map((labeledValue) => {
        const createRelationDto = new CreateRelationDto();
        createRelationDto.linkedInteractionId = parseInt(labeledValue.value as string);
        createRelationDto.relationType = relationType;
        createRelationDto.weight = RelationWeight.NotImportant;
        createRelationDto.linkedInteraction = labeledValue.data;
        return createRelationDto;
    })
}
