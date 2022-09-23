import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {Interaction} from "../../../BackEnd/grl-client/interact_db_client";
import {Logger, LogSource} from "../../../Services/logger";
import {notify} from "../../../Services/toast/notify";

export interface AppState {
    selectedInteraction: Interaction | null;
    selectedInteractionHistory: Interaction [];
    lastInteraction: Interaction | null;
    selectedInteractionHistoryIndex: number;
}

const initialState: AppState = {
    selectedInteraction: null,
    selectedInteractionHistory: [],
    lastInteraction: null,
    selectedInteractionHistoryIndex: 0,
}
const log = new Logger(LogSource.AppStateSlice);
export const appstateSlice = createSlice({
    name: 'appstate',
    initialState,
    reducers: {

        selectInteraction: (state, action: PayloadAction<Interaction | null>) => {
            // clear selected interaction first
            state.selectedInteraction = null;

            state.selectedInteraction = action.payload;
            // add to history
            if (action.payload) {
                state.selectedInteractionHistory.push(action.payload);
            }

            notify("Interaction Selected", action.payload?.label ?? action.payload?.id, "info");
        },
        unselectInteraction: (state) => {
            state.selectedInteraction = null;
        },
        addToInteractionHistory: (state, action: PayloadAction<Interaction>) => {
            // set last interaction
            state.lastInteraction = state.selectedInteraction;
            // add new interaction to history
            state.selectedInteractionHistory.push(action.payload);
            // update history index
            state.selectedInteractionHistoryIndex = state.selectedInteractionHistory.length - 1;


        },
        clearInteractionHistory: (state) => {
            state.selectedInteractionHistory = [];
        },
        setLastInteraction: (state, action: PayloadAction<Interaction | null>) => {
            state.lastInteraction = action.payload;
            // update history index
            state.selectedInteractionHistoryIndex = state.selectedInteractionHistory.length - 1;
        },
        // set selected interaction history index
        setSelectedInteractionHistoryIndex: (state, action: PayloadAction<number>) => {
            state.selectedInteractionHistoryIndex = action.payload;
        },
        // go back to last interaction using history index
        goBackToLastInteraction: (state) => {

            console.log("going back to last interaction", 'selecte history index', state.selectedInteractionHistoryIndex );
            if (state.selectedInteractionHistoryIndex > 0) {
                state.selectedInteractionHistoryIndex -= 1;
                state.selectedInteraction = state.selectedInteractionHistory[state.selectedInteractionHistoryIndex];
            }
            // update history index
            state.selectedInteractionHistoryIndex = state.selectedInteractionHistory.length - 1;
        },
        goForwardToNextInteraction: (state) => {
            if (state.selectedInteractionHistory.length > 0) {
                state.selectedInteraction = state.selectedInteractionHistory[state.selectedInteractionHistoryIndex + 1];
            }
            // update history index
            state.selectedInteractionHistoryIndex = state.selectedInteractionHistoryIndex + 1;
        }
    },
})


// Action creators are generated for each case reducer function
export const {
    selectInteraction, unselectInteraction,
    goBackToLastInteraction, goForwardToNextInteraction

} = appstateSlice.actions

export default appstateSlice.reducer
