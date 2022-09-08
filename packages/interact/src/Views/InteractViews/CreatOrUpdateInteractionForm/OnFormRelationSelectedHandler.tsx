import {RelationTypes, RelationWeight} from "../../../clients/grl-client/interact_db_client";
import {CreateRelationDto} from "./CreateRelationDto";
import {CreateInteractionFormData} from "./CreateInteractionFormData";
import {Dispatch, SetStateAction} from "react";

// this updates the form data with the selected interactions (in relation to the host interaction)
export const onFormRelationSelectedHandler = (e: string[],
                                              SubjectRelation: RelationTypes,
                                              formData: CreateInteractionFormData,
                                              setFormData: Dispatch<SetStateAction<CreateInteractionFormData>>) => {
    console.log("Ready to load payload", e, SubjectRelation)
    const createDtos = SelectedInteractionToRelationDto(e, SubjectRelation)
    switch (SubjectRelation) {
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

const SelectedInteractionToRelationDto = (selectedInteractionIds: string[], relationType: RelationTypes): CreateRelationDto[] => {
    return selectedInteractionIds.map((id) => {
        return {
            linkedInteractionId: parseInt(id, 10),
            relationType: relationType,
            weight: RelationWeight.NotImportant,
        }
    })
}
