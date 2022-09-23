import create from 'zustand'
import {CratecontrollerscrollApi, CratecontrollersearchApi, CratecontrollerlistIndicesApi} from "./BackEnd/distant_api";
import {devtools, persist} from "zustand/middleware";

export interface DistantApiStore {
    searchApi: CratecontrollersearchApi | null
    setSearchApi: (api: CratecontrollersearchApi) => void
    scrollApi: CratecontrollerscrollApi | null
    setScrollApi: (api: CratecontrollerscrollApi) => void
    listIndicesApi: CratecontrollerlistIndicesApi | null
    setListIndicesApi: (api: CratecontrollerlistIndicesApi) => void
}

export const useDistantApiStore = create<DistantApiStore>()(
    devtools(
        persist(
            (set) => ({
                searchApi: null,
                setSearchApi: (api: CratecontrollersearchApi) => set({searchApi: api}),
                scrollApi: null,
                setScrollApi: (api: CratecontrollerscrollApi) => set({scrollApi: api}),
                listIndicesApi: null,
                setListIndicesApi: (api: CratecontrollerlistIndicesApi) => set({listIndicesApi: api}),
            }),
            {
                name: 'distant-api-store',
            }
        )
    )
)
