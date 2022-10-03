import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {CurrentComponentUtils, CurrentComponent} from "./current_component";
import {CarrelComponent} from "../../../carrel_server_client/carrel/core/shared/v1/core_shared_v1_pb";

export interface AppState {
    currentComponent: CurrentComponent
}

const initialState: AppState = {
    currentComponent: CurrentComponentUtils.getDefaultComponent()
}

export const appstateSlice = createSlice({
    name: 'appstate',
    initialState,
    reducers: {
        setCurrentComponent: (state, action: PayloadAction<CarrelComponent>) => {
            state.currentComponent = CurrentComponentUtils.getComponent(action.payload)
        },
        setMainComponent: (state) => {
            state.currentComponent = CurrentComponentUtils.getDefaultComponent()
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setCurrentComponent,
    setMainComponent
} = appstateSlice.actions

export default appstateSlice.reducer
