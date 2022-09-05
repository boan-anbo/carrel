import {
    AddNewInteractionEntityDocument, AddNewInteractionEntityMutation, AddNewInteractionEntityMutationHookResult,
    AddNewInteractionEntityMutationResult,
    Interaction, useAddNewInteractionEntityMutation
} from "../grl-client/interact_db_client";
import {getApolloClient} from "../../utils/get-apollo-client";
import {FetchResult} from "@apollo/client";

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
