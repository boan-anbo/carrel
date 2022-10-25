import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface WriterState {
    activeEditorId: string | null
    selectedFilePath: string | null
}

const initialState: WriterState = {
    activeEditorId: null,
    selectedFilePath: null
}

export const writerStateSlice = createSlice({
    name: 'writer-state',
    initialState,
    reducers: {
        setActiveEditorId: (state, action: PayloadAction<string | null>) => {
            state.activeEditorId = action.payload
        },
        setSelectedFilePath: (state, action: PayloadAction<string | null>) => {
            state.selectedFilePath = action.payload
        }

    },
})

export const {
    setActiveEditorId,
    setSelectedFilePath
} = writerStateSlice.actions

export default writerStateSlice.reducer;
