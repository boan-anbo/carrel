import {Interaction, RelationTypes, RelationWeight} from "../../../BackEnd/clients/grl-client/interact_db_client";
import {CreateRelationDto} from "./CreateRelationDto";
import {CreateInteractionFormData} from "./CreateInteractionFormData";
import {Dispatch, SetStateAction} from "react";
import {Logger, LogSource} from "../../../Services/logger";
import {SelectValue} from "../../_ViewComponents/Selectors/FilterComponents/SelectValue";

const log = new Logger(LogSource.OnFormRelationSelectedHandler)
// this updates the form data with the selected interactions (in relation to the host interaction)
export const onFormRelationSelectedHandler = (
    selectValues: SelectValue<Interaction>[],
    relations: RelationTypes,
    formData: CreateInteractionFormData,
    setFormData: Dispatch<SetStateAction<CreateInteractionFormData>>) => {
    log.debug("onFormRelationSelectedHandler", 'Provided selection data', {
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

const SelectedInteractionToRelationDto = (selectValues: SelectValue<Interaction>[], relationType: RelationTypes): CreateRelationDto[] => {
    return selectValues.map((labeledValue) => {
        const createRelationDto = new CreateRelationDto();
        createRelationDto.linkedInteractionId = parseInt(labeledValue.value as string);
        createRelationDto.relationType = relationType;
        createRelationDto.weight = RelationWeight.NotImportant;
        return createRelationDto;
    })
}
