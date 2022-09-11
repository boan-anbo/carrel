import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {Interaction} from "../../../BackEnd/grl-client/interact_db_client";
import {Logger, LogSource} from "../../../Services/logger";
import {SelectValue} from "../../../Views/_ViewComponents/_ControlComponents/Select/SelectValue";

export interface SearchState {
    searchOptionPool: SelectValue<Interaction>[],
}

const initialState: SearchState = {
    searchOptionPool: [],
}
const log = new Logger(LogSource.SearchState);
export const searchStateSlice = createSlice({
    name: 'searchstate',
    initialState,
    reducers: {
        updateSearchOptionPool: (state, action: PayloadAction<SelectValue<Interaction>[]>) => {
            // add to the existing data
            const existingData = state.searchOptionPool;
            const newData = action.payload;
            const existingDataIds = existingData.map((d) => d.value);
            const newDataToAdd = newData.filter((d) => !existingDataIds.includes(d.value));
            state.searchOptionPool = [...existingData, ...newDataToAdd];
        },
    },
})


// Action creators are generated for each case reducer function
export const {
    updateSearchOptionPool,

} = searchStateSlice.actions

export default searchStateSlice.reducer
