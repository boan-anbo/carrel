// use vitest

import {expect, it} from 'vitest'
import {getRecentInteractions} from "./filter-operations";
import {ApolloClient, InMemoryCache} from "@apollo/client";



it('should fetch data from interact db', async () => {
    const interactions = await getRecentInteractions();
    expect(interactions.length).equals(1);
})
