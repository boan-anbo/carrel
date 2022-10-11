import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {ProjectInfo} from "../../../carrel_server_client/carrel/core/project_manager/v1/project_manager_v1_pb";
import {PlainMessage} from "@bufbuild/protobuf/dist/types/message";
import {Project} from "../../../carrel_server_client/carrel/common/project/v2/project_v2_pb";

export interface WorkingProjectState {
    workingProject: PlainMessage<ProjectInfo> | null
}

const initialState: WorkingProjectState = {
    workingProject: null
}

export const workingProjectStateSlice = createSlice({
    name: 'working-project-state',
    initialState,
    reducers: {
        setWorkingProject: (state, action: PayloadAction<PlainMessage<ProjectInfo> | null>) => {
            state.workingProject = action.payload
        }

    },
})

export const {setWorkingProject} = workingProjectStateSlice.actions

export default workingProjectStateSlice.reducer;
