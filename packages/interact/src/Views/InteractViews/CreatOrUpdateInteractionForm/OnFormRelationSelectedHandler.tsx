import {Interaction, RelationTypes, RelationWeight} from "../../../clients/grl-client/interact_db_client";
import {CreateRelationDto} from "./CreateRelationDto";
import {CreateInteractionFormData} from "./CreateInteractionFormData";
import {Dispatch, SetStateAction} from "react";
import {LabeledValue} from "antd/lib/select";
import {Logger, LogSource} from "../../../utils/logger";
import {SelectValue} from "../../ViewComponents/FilterControls/SelectValue";

const log = new Logger(LogSource.OnFormRelationSelectedHandler)
// this updates the form data with the selected interactions (in relation to the host interaction)
export const onFormRelationSelectedHandler = (selectValues: SelectValue<Interaction>[],
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
            setFormData({...formData, contextDtos: createDtos})
            break;
        case RelationTypes.SubjectRelation:
            setFormData({...formData, subjectDtos: createDtos})
            break;
        case RelationTypes.FirstActRelation:
            setFormData({...formData, firstActDtos: createDtos})
            break;
        case RelationTypes.ObjectRelation:
            setFormData({...formData, objectDtos: createDtos})
            break;
        case RelationTypes.SecondActRelation:
            setFormData({...formData, secondActDtos: createDtos})
            break;
        case RelationTypes.IndirectObjectRelation:
            setFormData({...formData, indirectObjectDtos: createDtos})
            break;
        case RelationTypes.ParallelRelation:
            setFormData({...formData, parallelDtos: createDtos})
            break;
        case RelationTypes.PurposeRelation:
            setFormData({...formData, purposeDtos: createDtos})
            break;
        case RelationTypes.ReferenceRelation:
            setFormData({...formData, referenceDtos: createDtos})
            break;
        case RelationTypes.SettingRelation:
            setFormData({...formData, settingDtos: createDtos})
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
