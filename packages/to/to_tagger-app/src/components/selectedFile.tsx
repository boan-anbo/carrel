import {useAppStateStore} from "../appStateStore";
import {useEffect, useState} from "react";
import {TagsList} from "./tagsList";

import {fireflyKeeperApi} from "../server-utils/api-clients";
import {
    ScanFilesForFirefliesResponse
} from "../carrel_server_client/carrel/server/firefly_keeper/v1/server_firefly_keeper_v1_pb";
import {ButtonGroup} from "@mantine/core/lib/Button/ButtonGroup/ButtonGroup";
import { Button } from "@mantine/core";

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
                files: [selectedFile],
                classifiedOnly: false,
            }
        )
        console.log(results);
        setParseResult(results);
        const allTagsStrings: string[] = results.fireflies?.allFireflies.map(fireflies => fireflies.selectTag?.snippet?.snippet ?? '') ?? [];
        setTagString(allTagsStrings)
    }
    return <>
        <button onClick={() => loadParseResults(selectedFile)}>Parse</button>
        <span className={'text-xs'}>{selectedFile}</span>
        <div>
            <div><Button variant={"white"} onClick={() => loadParseResults(selectedFile)}>Refresh </Button></div>
            <TagsList
                tags={parseResult?.fireflies?.allFireflies.filter(fly => fly.selectTag).map(fly => fly.selectTag!) ?? []}/>
        </div>
    </>;
}
