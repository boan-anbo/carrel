import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {CurrentComponentUtils, CurrentComponent} from "./current_component";
import {CarrelComponent} from "../../../../backend/carrel_server_client/carrel/core/shared/v1/core_shared_v1_pb";
import { File } from '../../../../backend/carrel_server_client/carrel/common/file/v1/file_v1_pb';
import { Tag } from '../../../../backend/carrel_server_client/carrel/common/tag/v2/tag_v2_pb';
import { EMainWorkAreaPage } from '../../../domains/carrel/components/MainWorkArea';
export enum SelectedInspectorItemType {

}
export interface AppState {
    currentComponent: CurrentComponent
    /**
     * The current archive being edited.
     */
    archiveFilesSelected: File[]
    /**
     * Project files selected
     */
    projectFilesSelected: File[]
    /**
     * 
     */
    coreTagsSelected: Tag[]

    workAreaFirstView: EMainWorkAreaPage
    workAreaSecondView: EMainWorkAreaPage
}

const initialState: AppState = {
    currentComponent: CurrentComponentUtils.getDefaultComponent(),
    archiveFilesSelected: [],
    projectFilesSelected: [],
    coreTagsSelected: [],
    workAreaFirstView: EMainWorkAreaPage.DEFAULT,
    workAreaSecondView: EMainWorkAreaPage.DEFAULT
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
        },
        setArchiveFilesSelected: (state, action: PayloadAction<File[]>) => {
            state.archiveFilesSelected = action.payload
        },
        setProjectFilesSelected: (state, action: PayloadAction<File[]>) => {
            state.projectFilesSelected = action.payload
        },
        setTagsSelected: (state, action: PayloadAction<Tag[]>) => {
            state.coreTagsSelected = action.payload
        },
        setWorkAreaFirstView: (state, action: PayloadAction<EMainWorkAreaPage>) => {
            state.workAreaFirstView = action.payload
        },
        setWorkAreaSecondView: (state, action: PayloadAction<EMainWorkAreaPage>) => {
            state.workAreaSecondView = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setCurrentComponent,
    setMainComponent,
    setArchiveFilesSelected,
    setProjectFilesSelected,
    setTagsSelected,
    setWorkAreaFirstView,
    setWorkAreaSecondView
} = appstateSlice.actions

export default appstateSlice.reducer
