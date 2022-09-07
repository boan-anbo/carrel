// redux store
import {configureStore} from '@reduxjs/toolkit'
import {appstateSlice} from "./features/app-state/appStateSlice";


export const store = configureStore({
    reducer: {
        appstate: appstateSlice.reducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
