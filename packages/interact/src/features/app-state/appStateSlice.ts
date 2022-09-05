import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {Passage} from '../../clients/distant_api';
import {Interaction} from "../../clients/grl-client/interact_db_client";

export interface AppState {
    selectedInputPassage: Passage | null;
    selectedInputText: string | null;
    selectedInteraction: Interaction | null;
}

const initialState: AppState = {
    selectedInteraction: null,
    selectedInputText: "",
    selectedInputPassage: null
}

export const appstateSlice = createSlice({
    name: 'appstate',
    initialState,
    reducers: {
        selectPassage: (state, action: PayloadAction<Passage>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
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

        selectInteraction: (state, action: PayloadAction<Interaction>) => {
            state.selectedInteraction = action.payload;
        },
        unselectInteraction: (state) => {
            state.selectedInteraction = null;
        }
    },
})


// Action creators are generated for each case reducer function
export const {
    selectPassage, unselectPassage,
    selectInputText, unselectInputText,
    selectInteraction, unselectInteraction

} = appstateSlice.actions

export default appstateSlice.reducer
