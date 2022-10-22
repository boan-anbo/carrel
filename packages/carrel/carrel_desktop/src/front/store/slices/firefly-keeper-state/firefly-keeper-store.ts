import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {PartialMessage} from "@bufbuild/protobuf";
import {Fireflies} from "../../../../backend/carrel_server_client/carrel/firefly_keeper/v1/firefly_keeper_v1_pb";
import {sampleFireFlies} from "./sample-fire-flies";

export interface FireflyKeeperStore {
    fireflies: PartialMessage<Fireflies> | null
}

const initialState: FireflyKeeperStore = {
    fireflies: sampleFireFlies
}

export const fireflyKeeperStore = createSlice({
    name: 'firefly-keeper-store',
    initialState,
    reducers: {

        setFireflies: (state, action: PayloadAction<PartialMessage<Fireflies> | null>) => {
            state.fireflies = action.payload
        },

}});

export const {setFireflies} = fireflyKeeperStore.actions

export default fireflyKeeperStore.reducer;
