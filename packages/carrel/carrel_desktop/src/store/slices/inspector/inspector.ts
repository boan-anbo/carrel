import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {CarrelComponent} from "../../../carrel_server_client/carrel/core/shared/v1/core_shared_v1_pb";

export enum InspectorItemType {
    None = "None",
    Project = 'Project',
}

export interface InspectorItem<T> {
    item: T;
    itemType: InspectorItemType;
}

export interface InspectorStore {
    item: InspectorItem<any> | null
    itemType: InspectorItemType
}

const initialState: InspectorStore = {
    item: null,
    itemType: InspectorItemType.None

}

export const inspectorSlice = createSlice({
    name: 'inspector',
    initialState,
    reducers: {
        setInspectorItem: (state, action: PayloadAction<InspectorItem<any> | null>) => {
            state.item = action.payload
        },

        clearInspectorItem: (state) => {
            state.item = null
        }


    },
})

// Action creators are generated for each case reducer function
export const {
    setInspectorItem
} = inspectorSlice.actions

export default inspectorSlice.reducer
