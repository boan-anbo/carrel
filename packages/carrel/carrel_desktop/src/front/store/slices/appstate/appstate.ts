import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { CurrentComponentUtils, CurrentComponent } from "./current_component";
import { CarrelComponent } from "../../../../backend/carrel_server_client/carrel/core/shared/v1/core_shared_v1_pb";
import { File } from '../../../../backend/carrel_server_client/carrel/common/file/v1/file_v1_pb';
import { Tag } from '../../../../backend/carrel_server_client/carrel/common/tag/v2/tag_v2_pb';
import { EMainWorkAreaPage } from '../../../domains/carrel/components/MainWorkArea';
import { TCarrelSize } from '../../../../ui/props/i-size';
export enum SelectedInspectorItemType {

}
export interface AppState {
    currentComponent: CurrentComponent
    /**
     * The current archive being edited.
     */
    coreArchiveFilesSelected: File[]
    /**
     * Current selected archive
     */
    coreArchiveIdSelected: number | null
    /**
     * Project files selected
     */
    coreProjectFilesSelected: File[]
    /**
     * 
     */
    coreTagsSelected: Tag[]

    workAreaFirstView: EMainWorkAreaPage
    workAreaSecondView: EMainWorkAreaPage

    /**
     * Configurations
     */
    globalSize: TCarrelSize;
}

const initialState: AppState = {
    currentComponent: CurrentComponentUtils.getDefaultComponent(),
    coreArchiveFilesSelected: [],
    coreProjectFilesSelected: [],
    coreTagsSelected: [],
    workAreaFirstView: EMainWorkAreaPage.DEFAULT,
    workAreaSecondView: EMainWorkAreaPage.DEFAULT,
    coreArchiveIdSelected: null,

    globalSize: 'xs'
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
            state.coreArchiveFilesSelected = action.payload
        },
        setProjectFilesSelected: (state, action: PayloadAction<File[]>) => {
            state.coreProjectFilesSelected = action.payload
        },
        setTagsSelected: (state, action: PayloadAction<Tag[]>) => {
            state.coreTagsSelected = action.payload
        },
        setWorkAreaFirstView: (state, action: PayloadAction<EMainWorkAreaPage>) => {
            state.workAreaFirstView = action.payload
        },
        setWorkAreaSecondView: (state, action: PayloadAction<EMainWorkAreaPage>) => {
            state.workAreaSecondView = action.payload
        },
        setCoreArchiveIdSelected: (state, action: PayloadAction<number | null>) => {
            state.coreArchiveIdSelected = action.payload
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
    setWorkAreaSecondView,
    setCoreArchiveIdSelected

} = appstateSlice.actions

export default appstateSlice.reducer
