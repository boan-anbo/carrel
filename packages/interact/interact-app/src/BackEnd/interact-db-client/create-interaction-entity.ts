import {
    AddInteractionDocument,
    AddInteractionMutation,
    AddNewInteractionEntityDocument,
    AddNewInteractionEntityMutation,
    CreateOrUpdateInteractionRequestDtoInput,
    CreateOrUpdateRelationDtoInput,
    Interaction,
    InteractionIdentity
} from "../grl-client/interact_db_client";
import {getApolloClient} from "../../Services/get-apollo-client";
import {FetchResult} from "@apollo/client";
import {
    CreateOrUpdateInteractionForm
} from "../../Views/CreateOrUpdateInteraction/FormComponents/CreateOrUpdateInteractionForm";
import {CreateRelationDto} from "../../Views/CreateOrUpdateInteraction/FormComponents/CreateRelationDto";
import {Logger, LogSource} from "../../Services/logger";

const log = new Logger(LogSource.CreateInteractionEntity);

export async function createInteractionEntity(label: string, identity: InteractionIdentity, description?: string, content?: string): Promise<Interaction> {
    try {

        console.log('createInteractionEntity with data:', {label, identity, description, content});
        const data: FetchResult<AddNewInteractionEntityMutation> = await getApolloClient().mutate({
            mutation: AddNewInteractionEntityDocument,
            variables: {
                label: label as string,
                identity: identity as InteractionIdentity,
            }
        });

        console.log('data', data);
        return data.data?.addNewEntityInteraction as Interaction;
    } catch (e) {

        console.error('Error when creating interaction entity', e);
        throw e;
    }
}

export async function createOrUpdateInteraction(createDto: CreateOrUpdateInteractionForm): Promise<Interaction> {
    // validate form data
    CreateOrUpdateInteractionForm.validateOrThrow(createDto);
    log.info('createOrUpdateInteraction', 'Create Dto to convert', createDto);

    const request: CreateOrUpdateInteractionRequestDtoInput = CreateDtoToCreateOrUpdateInteractionRequestDtoInput(createDto);
    log.info('createOrUpdateInteraction', 'Request form date converted from Create Dto', request);
    const data: FetchResult<AddInteractionMutation> = await getApolloClient().mutate({
        mutation: AddInteractionDocument,
        variables: {
            request
        }
    });
    console.log('Result of Create Or Update Interaction', data);
    return data.data?.createOrUpdateInteraction as Interaction;
}

const CreateDtoToCreateOrUpdateInteractionRequestDtoInput = (createDto: CreateOrUpdateInteractionForm): CreateOrUpdateInteractionRequestDtoInput => {
    const result = {
        id: createDto.id ?? 0,
        uuid: createDto.uuid ?? null,
        label: createDto.label,
        identity: createDto.identity,
        start: createDto.start ?? null,
        end: createDto.end ?? null,
        description: createDto.description,
        content: createDto.content,
        data: createDto.data,
        dataType: createDto.dataType,
        uri: createDto.uri,

        categoryDtos: dtoToInput(createDto.categoryDtos),
        contextDtos: dtoToInput(createDto.contextDtos),
        subjectDtos: dtoToInput(createDto.subjectDtos),
        firstActDtos: dtoToInput(createDto.firstActDtos),
        objectDtos: dtoToInput(createDto.objectDtos),
        secondActDtos: dtoToInput(createDto.secondActDtos),
        indirectObjectDtos: dtoToInput(createDto.indirectObjectDtos),
        settingDtos: dtoToInput(createDto.settingDtos),
        tagDtos: dtoToInput(createDto.tagDtos),
        purposeDtos: dtoToInput(createDto.purposeDtos),
        parallelDtos: dtoToInput(createDto.parallelDtos),
        referenceDtos: dtoToInput(createDto.referenceDtos),

    } as CreateOrUpdateInteractionRequestDtoInput;

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
                label: createDto.label ?? "",
                linkedInteractionId: createDto.linkedInteractionId ?? 0,
                relationType: createDto.relationType,
                uuid: createDto.uuid ?? null,
                weight: createDto.weight,
                hits: createDto.hits,
                order: createDto.order,
            } as CreateOrUpdateRelationDtoInput;
        }
    ) ?? [];

}
