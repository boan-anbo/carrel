import {getApolloClient} from "../utils/get-apollo-client";
import {
    FilterInteractionsByLabelDocument,
    GetInteractionsQuery, Interaction,
    InteractionsConnection
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
