import {SizeType} from "antd/lib/config-provider/SizeContext";
import FilterInteractionMultiple from "../../../ViewComponents/FilterControls/FilterInteractionMultiple";
import {Interaction, InteractionIdentity} from "../../../../clients/grl-client/interact_db_client";
import {CreateInteractionFormData} from "./CreateInteractionFormData";
import {SelectValue} from "../../../ViewComponents/FilterControls/SelectValue";

interface CreateOrUpdateInteractionFormRelationInputProps {
    formData: CreateInteractionFormData;
    size: SizeType | undefined;
    onContextsSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onSubjectsSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onFirstActsSelected: ((value:SelectValue<Interaction> []) => void) | undefined
    onObjectsSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onSecondActsSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onIndirectObjectsSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onSettingsSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onPurpoesSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onParallelSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onReferencesSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
}

export function CreateOrUpdateInteractionFormRelationInputs(props: CreateOrUpdateInteractionFormRelationInputProps) {
    return <>
        {/*Relation inputs*/}
        <FilterInteractionMultiple
            currentValueDtos={props.formData.contextDtos}
            label="Contexts"
            size={props.size}
            placeholder={"Context interactions"} style={{width: "100%"}} onSelect={
            props.onContextsSelected
        }></FilterInteractionMultiple>

        <FilterInteractionMultiple
            currentValueDtos={props.formData.subjectDtos}
            label="Subjects"
            size={props.size}
            placeholder={"subject interactions"} style={{width: "100%"}} onSelect={
            props.onSubjectsSelected
        }></FilterInteractionMultiple>

        {/*Controls for first act*/}
        <FilterInteractionMultiple
            currentValueDtos={props.formData.firstActDtos}
            label="First Acts"
            size={props.size}
            createInteractionIdentity={InteractionIdentity.Act}
            placeholder={"First act interactions"} style={{width: "100%"}} onSelect={
            props.onFirstActsSelected
        }></FilterInteractionMultiple>


        <FilterInteractionMultiple
            currentValueDtos={props.formData.objectDtos}
            label="Objects"
            size={props.size}
            placeholder={"Object interactions"} style={{width: "100%"}} onSelect={
            props.onObjectsSelected
        }></FilterInteractionMultiple>

        {/*Controls for second act*/}
        <FilterInteractionMultiple
            currentValueDtos={props.formData.secondActDtos}
            label="Second Acts"
            size={props.size}
            createInteractionIdentity={InteractionIdentity.Act}
            placeholder={"Second act interactions"} style={{width: "100%"}} onSelect={
            props.onSecondActsSelected
        }></FilterInteractionMultiple>


        <FilterInteractionMultiple
            currentValueDtos={props.formData.indirectObjectDtos}
            label="Indirect Objects"
            size={props.size}
            placeholder={"Indirect object interactions"} style={{width: "100%"}} onSelect={
            props.onIndirectObjectsSelected
        }></FilterInteractionMultiple>

        <FilterInteractionMultiple
            currentValueDtos={props.formData.parallelDtos}
            label="Settings"
            size={props.size}
            placeholder={"Settings interactions"} style={{width: "100%"}} onSelect={
            props.onSettingsSelected
        }></FilterInteractionMultiple>


        <FilterInteractionMultiple
            currentValueDtos={props.formData.purposeDtos}
            label="Purposes"
            size={props.size}
            placeholder={"Purpose interactions"} style={{width: "100%"}} onSelect={
            props.onPurpoesSelected
        }></FilterInteractionMultiple>

        <FilterInteractionMultiple
            currentValueDtos={props.formData.parallelDtos}
            label="Parallels"
            size={props.size}
            placeholder={"Parallel interactions"} style={{width: "100%"}} onSelect={
            props.onParallelSelected
        }></FilterInteractionMultiple>

        <FilterInteractionMultiple
            currentValueDtos={props.formData.referenceDtos}
            label="References"
            size={props.size}
            placeholder={"reference interactions"} style={{width: "100%"}} onSelect={
            props.onReferencesSelected
        }></FilterInteractionMultiple>
    </>;
}
