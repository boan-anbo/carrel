import create from 'zustand'
import {
    CratecontrollerscrollApi,
    CratecontrollersearchApi,
    CratecontrollerlistIndicesApi,
    Passage
} from "./BackEnd/distant_api";
import {devtools, persist} from "zustand/middleware";
import {BehaviorSubject} from "rxjs";

export interface InputPassageStore {
    inputPassageRadio: BehaviorSubject<Passage |null>
}

export const useInputPassageRadioStore = create<InputPassageStore>()(
    devtools(
        persist(
            (set) => ({
                inputPassageRadio: new BehaviorSubject<Passage | null>(null),
            }),
            {
                name: 'input-passage-radio',
            }
        )
    )
)
