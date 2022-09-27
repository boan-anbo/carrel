import {useAppStateStore} from "../appStateStore";
import {useEffect, useState} from "react";
import {TagsList} from "./tagsList";

import {fireflyKeeperApi} from "../server-utils/api-clients";
import {Tag} from "../carrel_server_client/carrel/common/tag/v1/tag_v1_pb";
import {
    ScanFilesForFirefliesResponse
} from "../carrel_server_client/carrel/server/firefly_keeper/v1/server_firefly_keeper_v1_pb";

export function SelectedFile() {

    const [parseResult, setParseResult] = useState<ScanFilesForFirefliesResponse | null>(null);
    const selectedFile = useAppStateStore(state => state.selectedFile);
    const setTagString = useAppStateStore(state => state.setTagStrings);
    useEffect(() => {
        if (selectedFile) {

            loadParseResults(selectedFile)
        }
    }, [selectedFile])

    const loadParseResults = async (selectedFile: string) => {
        const results: ScanFilesForFirefliesResponse = await fireflyKeeperApi.scanFilesForFireflies(
            {
                files: [selectedFile]
            }
        )
        console.log(results);
        setParseResult(results);
        const allTagsStrings: string[] = results.fireflies?.allTags.map(tag => tag.tagMarker) ?? [];
        setTagString(allTagsStrings)
    }
    return <>
        <button onClick={() => loadParseResults(selectedFile)}>Parse</button>
        <span className={'text-xs'}>{selectedFile}</span>
        <div>
            <TagsList tags={parseResult?.fireflies?.allTags ?? []}/>
        </div>
    </>;
}
