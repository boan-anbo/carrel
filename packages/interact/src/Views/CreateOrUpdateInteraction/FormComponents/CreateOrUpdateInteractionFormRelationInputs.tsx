import FilterInteractionMultiple from "../../_ViewComponents/Selectors/FilterInteractionMultiple";
import {Interaction, InteractionIdentity} from "../../../BackEnd/grl-client/interact_db_client";
import {CreateOrUpdateInteractionForm} from "./CreateOrUpdateInteractionForm";
import {SelectValue} from "../../_ViewComponents/_ControlComponents/Select/SelectValue";
import {MantineSize} from "@mantine/core";

interface CreateOrUpdateInteractionFormRelationInputProps {
    formData: CreateOrUpdateInteractionForm;
    size: MantineSize | undefined;
    onContextsSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onSubjectsSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onFirstActsSelected: ((value: SelectValue<Interaction> []) => void) | undefined
    onObjectsSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onSecondActsSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onIndirectObjectsSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onSettingsSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onPurpoesSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onParallelSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onReferencesSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onTagsSelected: ((value: SelectValue<Interaction>[]) => void) | undefined
    onSubmitForm: () => void;
}

export function CreateOrUpdateInteractionFormRelationInputs(props: CreateOrUpdateInteractionFormRelationInputProps) {
    return <div className={'space-y-4'}>
        <FilterInteractionMultiple
            onSubmitForm={props.onSubmitForm}
            currentValueDtos={props.formData.tagDtos}
            label="Tags"
            size={props.size}
            placeholder={"Tag interactions"} style={{width: "100%"}} onMultiSelectionChange={
            props.onTagsSelected
        }></FilterInteractionMultiple>
        {/*Relation inputs*/}
        <FilterInteractionMultiple
            onSubmitForm={props.onSubmitForm}
            description={'Contextual relationship'}
            currentValueDtos={props.formData.contextDtos}
            label="Contexts"
            size={props.size}
            placeholder={"Context interactions"} style={{width: "100%"}} onMultiSelectionChange={
            props.onContextsSelected
        }></FilterInteractionMultiple>

        <FilterInteractionMultiple
            onSubmitForm={props.onSubmitForm}
            currentValueDtos={props.formData.subjectDtos}
            label="Subjects"
            size={props.size}
            placeholder={"subject interactions"} style={{width: "100%"}}
            onMultiSelectionChange={
                props.onSubjectsSelected
            }></FilterInteractionMultiple>

        {/*Controls for first act*/}
        <FilterInteractionMultiple
            onSubmitForm={props.onSubmitForm}
            currentValueDtos={props.formData.firstActDtos}
            label="First Acts"
            size={props.size}
            createInteractionIdentity={InteractionIdentity.Act}
            placeholder={"First act interactions"} style={{width: "100%"}} onMultiSelectionChange={
            props.onFirstActsSelected
        }></FilterInteractionMultiple>


        <FilterInteractionMultiple
            onSubmitForm={props.onSubmitForm}
            currentValueDtos={props.formData.objectDtos}
            label="Objects"
            size={props.size}
            placeholder={"Object interactions"} style={{width: "100%"}} onMultiSelectionChange={
            props.onObjectsSelected
        }></FilterInteractionMultiple>

        {/*Controls for second act*/}
        <FilterInteractionMultiple
            onSubmitForm={props.onSubmitForm}
            currentValueDtos={props.formData.secondActDtos}
            label="Second Acts"
            size={props.size}
            createInteractionIdentity={InteractionIdentity.Act}
            placeholder={"Second act interactions"} style={{width: "100%"}} onMultiSelectionChange={
            props.onSecondActsSelected
        }></FilterInteractionMultiple>


        <FilterInteractionMultiple
            onSubmitForm={props.onSubmitForm}
            currentValueDtos={props.formData.indirectObjectDtos}
            label="Indirect Objects"
            size={props.size}
            placeholder={"Indirect object interactions"} style={{width: "100%"}} onMultiSelectionChange={
            props.onIndirectObjectsSelected
        }></FilterInteractionMultiple>

        <FilterInteractionMultiple
            onSubmitForm={props.onSubmitForm}
            currentValueDtos={props.formData.settingDtos}
            label="Settings"
            size={props.size}
            placeholder={"Settings interactions"} style={{width: "100%"}} onMultiSelectionChange={
            props.onSettingsSelected
        }></FilterInteractionMultiple>


        <FilterInteractionMultiple
            onSubmitForm={props.onSubmitForm}
            currentValueDtos={props.formData.purposeDtos}
            label="Purposes"
            size={props.size}
            placeholder={"Purpose interactions"} style={{width: "100%"}} onMultiSelectionChange={
            props.onPurpoesSelected
        }></FilterInteractionMultiple>

        <FilterInteractionMultiple
            onSubmitForm={props.onSubmitForm}
            currentValueDtos={props.formData.parallelDtos}
            label="Parallels"
            size={props.size}
            placeholder={"Parallel interactions"} style={{width: "100%"}} onMultiSelectionChange={
            props.onParallelSelected
        }></FilterInteractionMultiple>

        <FilterInteractionMultiple
            onSubmitForm={props.onSubmitForm}
            currentValueDtos={props.formData.referenceDtos}
            label="References"
            size={props.size}
            placeholder={"reference interactions"} style={{width: "100%"}} onMultiSelectionChange={
            props.onReferencesSelected
        }></FilterInteractionMultiple>
    </div>;
}
