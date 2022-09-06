import {
    AddInteractionDocument,
    AddNewInteractionEntityDocument,
    AddNewInteractionEntityMutation,
    CreateOrUpdateInteractionRequestDtoInput,
    CreateOrUpdateRelationDtoInput,
    CreateOrUpdateRelationMutation,
    Interaction
} from "../grl-client/interact_db_client";
import {getApolloClient} from "../../utils/get-apollo-client";
import {FetchResult} from "@apollo/client";
import {CreateInteractionFormData, CreateRelationDto} from "../../Views/CreateorUpdateInteractionForm";

export async function createInteractionEntity(label: string, description: string, content: string): Promise<Interaction> {
    const data: FetchResult<AddNewInteractionEntityMutation> = await getApolloClient().mutate({
        mutation: AddNewInteractionEntityDocument,
        variables: {
            label: label,
        }
    });

    console.log('data', data);
    return data.data?.addNewEntityInteraction as Interaction;
}

export async function createOrUpdateInteraction(createDto: CreateInteractionFormData): Promise<Interaction> {
    const request: CreateOrUpdateInteractionRequestDtoInput = CreateDtoToCreateOrUpdateInteractionRequestDtoInput(createDto);
    const data: FetchResult<CreateOrUpdateRelationMutation> = await getApolloClient().mutate({
        mutation: AddInteractionDocument,
        variables: {
            request
        }
    });
    console.log('Result of Create Or Update Interaction', data);
    return data as Interaction;
}

const CreateDtoToCreateOrUpdateInteractionRequestDtoInput = (createDto: CreateInteractionFormData): CreateOrUpdateInteractionRequestDtoInput => {
    const result = {
        id: createDto.id ?? 0,
        uuid: createDto.uuid ?? null,
        label: createDto.label,
        identity: createDto.identity,
        start: createDto.start ?? 0,
        end: createDto.end ?? 0,
        description: createDto.description,
        content: createDto.content,
        firstActId: createDto.firstActId ?? 1,
        secondActId: createDto.secondActId ?? 1,
        contextIds: dtoToInput(createDto.contextIds),
        subjectIds: dtoToInput(createDto.subjectIds),
        objectIds: dtoToInput(createDto.objectIds),
        indirectObjectIds: dtoToInput(createDto.indirectObjectIds),
        settingIds: dtoToInput(createDto.settingIds),
        purposeIds: dtoToInput(createDto.purposeIds),
        parallelIds: dtoToInput(createDto.parallelIds),
        referenceIds: dtoToInput(createDto.referenceIds),

    };

    console.log('CreateDtoToCreateOrUpdateInteractionRequestDtoInput', result);
    return result;
}

//  CreateRelationDto[] to CreateOrUpdateRelationRequestDtoInput[]
const dtoToInput = (createDtos?: CreateRelationDto[]): CreateOrUpdateRelationDtoInput[] => {
    return createDtos?.map((createDto) => {
            return {
                content: createDto.content ?? "",
                description: createDto.description ?? "",
                hostInteractionId: createDto.hostInteractionId ?? 0,
                id: createDto.id ?? 0,
                label: createDto.label ?? "",
                linkedInteractionId: createDto.linkedInteractionId ?? 0,
                relationType: createDto.relationType,
                uuid: createDto.uuid ?? "",
                weight: createDto.weight,
            } as CreateOrUpdateRelationDtoInput;
        }
    ) ?? [];

}
