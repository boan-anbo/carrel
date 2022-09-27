import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {Project} from "../../../../../carrel_server_client/generated/carrel/common/project/v1/project_v1_pb";
import {newUuid} from "../../../utils/new-uuid";
import {PartialMessage, Timestamp} from "@bufbuild/protobuf";
import {setTauriWindow} from "../../../tauri/window/set-tauri-window";
import {getNowISO} from "../../../utils/format-iso";
import {getDirectoryName} from "../../../utils/get-directory-name";

export interface WorkingProjectState {
    workingProject: PartialMessage<Project>
}

const initialState: WorkingProjectState = {
    workingProject: {
        uuid: newUuid(),
        name: "New Project",
        description: undefined,
        workingFolder: undefined,
        lastModified: getNowISO(),
        lastOpened: getNowISO(),
        archiveUuid: undefined
    }
}

export const workingProjectStateSlice = createSlice({
    name: 'working-project-state',
    initialState,
    reducers: {
        /**
         * use a directory to open a project
         * @param state
         * @param action
         */
        openWorkingProject: (state, action: PayloadAction<string>) => {
            state.workingProject = {
                uuid: newUuid(),
                name: getDirectoryName(action.payload),
                description: undefined,
                workingFolder: action.payload,
                lastModified: getNowISO(),
                lastOpened: getNowISO(),
                archiveUuid: undefined
            }
        },

    },
})

export const {openWorkingProject} = workingProjectStateSlice.actions

export default workingProjectStateSlice.reducer;
