import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {Passage} from '../../../BackEnd/distant_api';
import {Logger, LogSource} from "../../../Services/logger";
import {BehaviorSubject} from "rxjs";

export interface ExplorerState {
    selectedInputPassage: Passage | null;
    selectedInputText: string | null;
}

const initialState: ExplorerState = {
    selectedInputText: "",
    selectedInputPassage: null,
}
const log = new Logger(LogSource.ExplorerState);
export const explorerStateSlice = createSlice({
    name: 'explorer-state',
    initialState,
    reducers: {
        selectPassage: (state, action: PayloadAction<Passage>) => {
            state.selectedInputPassage = action.payload;
        },
        unselectPassage: (state) => {
            state.selectedInputPassage = null;
        },
        selectInputText: (state, action: PayloadAction<string | null>) => {
            state.selectedInputText = action.payload;
        },
        unselectInputText: (state) => {
            state.selectedInputText = null;
        },

    },
})


// Action creators are generated for each case reducer function
export const {
    selectPassage, unselectPassage,
    selectInputText, unselectInputText,

} = explorerStateSlice.actions

export default explorerStateSlice.reducer
