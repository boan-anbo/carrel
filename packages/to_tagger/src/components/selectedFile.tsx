import {useAppStateStore} from "../appStateStore";
import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api";
import {ScanResult} from "../dtos/totagger.models";
import {TagsList} from "./tagsList";

export function SelectedFile() {

    const [parseResult, setParseResult] = useState<ScanResult | null>(null);
    const selectedFile = useAppStateStore(state => state.selectedFile);
    const setTagString = useAppStateStore(state => state.setTagStrings);
    useEffect(() => {
        if (selectedFile) {

            loadParseResults(selectedFile)
        }
    }, [selectedFile])

    const loadParseResults = async (selectedFile: string) => {
        const results: ScanResult = await invoke("parse_file", {
            filePath: selectedFile
        });
        console.log(results);
        setParseResult({...results});
        setTagString(results.results?.tos?.map((tag) => tag.tag_string) ?? [])
    }
    return <>
        <button onClick={() => loadParseResults(selectedFile)}>Parse</button>
        <span className={'text-xs'}>{selectedFile}</span>
        <div>
            <TagsList tags={parseResult?.results?.tos ?? []}/>
        </div>
    </>;
}
