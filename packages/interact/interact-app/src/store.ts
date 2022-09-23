// redux store
import {configureStore} from '@reduxjs/toolkit'
import {appstateSlice} from "./States/features/app-state/appStateSlice";
import {graphStateSlice} from "./States/features/graph-state/graphStateSlice";
import {searchStateSlice} from "./States/features/search-state/searchStateSlice";
import {explorerStateSlice} from "./States/features/explorer-state/explorerStateSlice";


export const store = configureStore({
    reducer: {
        appstate: appstateSlice.reducer,
        graphstate: graphStateSlice.reducer,
        searchstate: searchStateSlice.reducer,
        explorerstate: explorerStateSlice.reducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
