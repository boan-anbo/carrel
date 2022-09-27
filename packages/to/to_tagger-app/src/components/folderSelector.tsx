import {Button} from "@mantine/core";
import {open} from "@tauri-apps/api/dialog";
import {useAppStateStore} from "../appStateStore";


export function FolderSelector() {

    const setFiles = useAppStateStore(state => state.setFiles);

    async function onSelectWatchFolder() {
        // tauri app, select folder

        const results = await open({
            multiple: true,
            filters: [
                {
                    name: "Plain texts",
                    extensions: ["txt", 'md'],
                }
            ]
        }) as string[];


        if (results.length > 0) {
            setFiles(results);
        }

    }

    return <>
        <Button variant='white' onClick={onSelectWatchFolder}>Select folder to watch</Button>
        <div className={'px-4 font-bold'}>
            Files:
        </div>
    </>
}
