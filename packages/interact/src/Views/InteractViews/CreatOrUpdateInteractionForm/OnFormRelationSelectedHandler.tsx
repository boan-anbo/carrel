import {RelationTypes, RelationWeight} from "../../../clients/grl-client/interact_db_client";
import {CreateRelationDto} from "./CreateRelationDto";
import {CreateInteractionFormData} from "./CreateInteractionFormData";
import {Dispatch, SetStateAction} from "react";
import {LabeledValue} from "antd/lib/select";

// this updates the form data with the selected interactions (in relation to the host interaction)
export const onFormRelationSelectedHandler = (e: LabeledValue[],
                                              relations: RelationTypes,
                                              formData: CreateInteractionFormData,
                                              setFormData: Dispatch<SetStateAction<CreateInteractionFormData>>) => {
    console.log("Ready to load payload", e, relations)
    const createDtos = SelectedInteractionToRelationDto(e, relations)
    console.log("Payload", createDtos)
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

const SelectedInteractionToRelationDto = (labaledValues: LabeledValue[], relationType: RelationTypes): CreateRelationDto[] => {
    return labaledValues.map((labeledValue) => {
        const createRelationDto = new CreateRelationDto();
        createRelationDto.linkedInteractionId = parseInt(labeledValue.value as string);
        createRelationDto.relationType = relationType;
        createRelationDto.weight = RelationWeight.NotImportant;
        return createRelationDto;
    })
}
