import create from 'zustand'
import {invoke} from "@tauri-apps/api";
import {notify} from "./utils/notify";

export interface AppStateStore {
    files: string[]
    setFiles: (files: string[]) => void
    selectedFile: string
    setSelectedFile: (file: string) => void
    // the current tag strings that could be selected
    tagStrings: string[]
    setTagStrings: (tagStrings: string[]) => void
    printTagStrings: (index: number) => void
}

export const useAppStateStore = create<AppStateStore>()((set) => ({
    files: [],
    setFiles: (files) => set({files}),
    selectedFile: '',
    setSelectedFile: (file) => set({selectedFile: file}),
    tagStrings: [],
    setTagStrings: (tagStrings) => set({tagStrings}),
    printTagStrings: async (index) => {

        // check if the tagString with the index exists
        const tagString = useAppStateStore.getState().tagStrings[index]
        if (tagString) {
            console.log('tagString', index, useAppStateStore.getState().tagStrings[index])
            await invoke("send_tag_string", {
                tagString
            })
            notify(`Sending ${tagString}`);
        } else {
            console.log('tagString', index, 'does not exist')
        }
    }

}))
