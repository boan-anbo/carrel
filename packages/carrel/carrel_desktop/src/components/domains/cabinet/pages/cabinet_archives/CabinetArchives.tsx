import {Box, VStack} from "@chakra-ui/react";
import {Allotment} from "allotment";
import {useState} from "react";
import {FaPlus} from "react-icons/fa";
import {ActionBar, Block, SplitView} from "../../../../ui/components";
import Page from "../../../../ui/page/Page";
import {ArchiveFiles} from "./ArchiveFiles";
import {ArchiveList} from "./ArchiveList";
import "./CabinetArchives.css";

export interface CabinetArchivesProps {
    projectDirectory?: string;
    isMock?: boolean;
}


export function CabinetArchives(props: CabinetArchivesProps) {

    const [selectedArchiveId, setSelectedArchiveId] =
        useState<number | null>(null);

    const first = (
        
            <ArchiveList
                projectDirectory={props.projectDirectory}
                onArchiveIdSelected={setSelectedArchiveId}
            />
    );
    const second = (
        <div style={
            {
                height: "100%",
                width: "100%",
                overflow: "auto"
            }
        }>
            <Block headerPosition="end" title={`Archive ${selectedArchiveId} files.`}>
                <ArchiveFiles
                    isMock={props.isMock}
                    projectDirectory={props.isMock ? "mock" : undefined}
                    selectedArchiveId={selectedArchiveId}
                />
            </Block>
        </div>
    );

    return (
        <Page title={"Archives"} description="browse archive files">
            {/*<ArchiveListActionBar selectedArchiveId={selectedArchiveId}/>*/}
            <SplitView
                firstSnap
                firstMin={200}
                firstInitial={300}
                secondMin={400}
                first={first} second={second}/>
        </Page>
    );
}
