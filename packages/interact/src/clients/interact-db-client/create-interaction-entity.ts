import {
    AddInteractionDocument, AddInteractionMutation, AddInteractionMutationResult,
    AddNewInteractionEntityDocument,
    AddNewInteractionEntityMutation,
    CreateOrUpdateInteractionRequestDtoInput, CreateOrUpdateRelationDocument,
    CreateOrUpdateRelationDtoInput,
    CreateOrUpdateRelationMutation,
    Interaction
} from "../grl-client/interact_db_client";
import {getApolloClient} from "../../utils/get-apollo-client";
import {FetchResult} from "@apollo/client";
import {CreateInteractionFormData, CreateRelationDto} from "../../Views/InteractViews/CreateorUpdateInteractionForm";

export async function createInteractionEntity(label: string, description: string, content: string): Promise<Interaction> {
    try {

        console.log('createInteractionEntity with data:', {label, description, content});
        const data: FetchResult<AddNewInteractionEntityMutation> = await getApolloClient().mutate({
            mutation: AddNewInteractionEntityDocument,
            variables: {
                label: label,
            }
        });

        console.log('data', data);
        return data.data?.addNewEntityInteraction as Interaction;
    } catch (e) {

        console.error('Error when creating interaction entity',e);
        throw e;
    }
}

export async function createOrUpdateInteraction(createDto: CreateInteractionFormData): Promise<Interaction> {
    const request: CreateOrUpdateInteractionRequestDtoInput = CreateDtoToCreateOrUpdateInteractionRequestDtoInput(createDto);
    const data: FetchResult<AddInteractionMutation> = await getApolloClient().mutate({
        mutation: AddInteractionDocument,
        variables: {
            request
        }
    });
    console.log('Result of Create Or Update Interaction', data);
    return data.data?.createOrUpdateInteraction as Interaction;
}

const CreateDtoToCreateOrUpdateInteractionRequestDtoInput = (createDto: CreateInteractionFormData): CreateOrUpdateInteractionRequestDtoInput => {
    const result = {
        id: createDto.id ?? 0,
        uuid: createDto.uuid ?? null,
        label: createDto.label,
        identity: createDto.identity,
        start: createDto.start ?? null,
        end: createDto.end ?? null,
        description: createDto.description,
        content: createDto.content,
        firstActDtos: dtoToInput(createDto.firstActDtos),
        secondActDtos: dtoToInput(createDto.secondActDtos),
        contextDtos: dtoToInput(createDto.contextDtos),
        subjectDtos: dtoToInput(createDto.subjectDtos),
        objectDtos: dtoToInput(createDto.objectDtos),
        indirectObjectDtos: dtoToInput(createDto.indirectObjectDtos),
        settingDtos: dtoToInput(createDto.settingDtos),
        purposeDtos: dtoToInput(createDto.purposeDtos),
        parallelDtos: dtoToInput(createDto.parallelDtos),
        referenceDtos: dtoToInput(createDto.referenceDtos),

    };

    console.log('CreateDtoToCreateOrUpdateInteractionRequestDtoInput', result);
    return result;
}

//  CreateRelationDto[] to CreateOrUpdateRelationRequestDtoInput[]
const dtoToInput = (createDtos?: CreateRelationDto[]): CreateOrUpdateRelationDtoInput[] => {
    console.log('dtoToInput', createDtos);
    return createDtos?.map((createDto) => {
            return {
                content: createDto.content ?? "",
                description: createDto.description ?? "",
                hostInteractionId: createDto.hostInteractionId ?? 0,
                id: createDto.id ?? 0,
                label: createDto.label ?? "",
                linkedInteractionId: createDto.linkedInteractionId ?? 0,
                relationType: createDto.relationType,
                uuid: createDto.uuid ?? null,
                weight: createDto.weight,
            } as CreateOrUpdateRelationDtoInput;
        }
    ) ?? [];

}
