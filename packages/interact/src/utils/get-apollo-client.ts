import {ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

export const getApolloClient: () => ApolloClient<NormalizedCacheObject> = () => {

    return new ApolloClient({ uri: 'http://localhost:5000/graphql/',
        cache: new InMemoryCache(),
    });
}
