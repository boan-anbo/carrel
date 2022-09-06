import {getApolloClient} from "../../utils/get-apollo-client";
import {
    FilterInteractionsByLabelDocument,
    GetInteractionFullDocument, GetInteractionFullQuery,
    GetInteractionsQuery,
    Interaction
} from "../grl-client/interact_db_client";

export async function filterInteractions(label: string): Promise<Interaction[]> {
    const {data}: {data: GetInteractionsQuery} = await getApolloClient().query({
        query: FilterInteractionsByLabelDocument,
        variables: {
            labelFilter: label
        },
    });

    console.log('data', data);
    return data.interactions?.nodes as Interaction[] ?? [];
}

export async function getFullInteractionById(id: number): Promise<Interaction | null> {
    const {data}: {data: GetInteractionFullQuery} = await getApolloClient().query({
        query: GetInteractionFullDocument,
        variables: {
            id: id
        },
    });

    console.log('data', data);
    return data.interactionFull.interaction as Interaction ?? null;
}

