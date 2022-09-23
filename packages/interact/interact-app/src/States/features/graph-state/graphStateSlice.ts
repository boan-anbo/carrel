import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {GraphinTreeDataWithI} from "../../../BackEnd/interact-db-client/graph-operations";

export interface GraphState {
    graphHistory: GraphinTreeDataWithI[];
}

const initialState: GraphState = {
    graphHistory: []
}

export const graphStateSlice = createSlice({
    name: 'graphstate',
    initialState,
    reducers: {
        addGraphHistory: (state, action: PayloadAction<GraphinTreeDataWithI>) => {
            state.graphHistory = [...state.graphHistory, action.payload];
        },
    },
})


// Action creators are generated for each case reducer function
export const {
    addGraphHistory

} = graphStateSlice.actions

export default graphStateSlice.reducer
