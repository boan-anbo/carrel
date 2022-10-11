import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger'
import appstateReducer from "./slices/appstate/appstate";
import workingProjectReducer from "./slices/working-project-state/working-project-state";
import {listenerMiddleware} from "./listners";
import {fireflyKeeperStore} from "./slices/firefly-keeper-state/firefly-keeper-store";
import Inspector from "./slices/inspector/inspector";

const store = configureStore({
        reducer: {
            appstate: appstateReducer,
            workingProject: workingProjectReducer,
            fireflyKeeper: fireflyKeeperStore.reducer,
            inspector: Inspector
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger).prepend(
                // listenerMiddleware
                listenerMiddleware.middleware
            ),
        devTools: process.env.NODE_ENV !== 'production',
    }
)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
