import "./CabinetArchives.css";
import Page from "../../../../ui/page/Page";
import {ArchiveList} from "./ArchiveList";
import {ArchiveSelected} from "./ArchiveSelected";
import {useState} from "react";
import {ArchiveListActionBar} from "./ArchiveListActionBar";


export function CabinetArchives() {

    const [selectedArchiveId, setSelectedArchiveId] = useState<number | null>(null);


    return <Page>

        <ArchiveListActionBar selectedArchiveId={selectedArchiveId}/>

        <div className={'cabinet-archives-container'}>

            <div className={'cabinet-archive-list'}>

                <ArchiveList onArchiveIdSelected={setSelectedArchiveId}/>
            </div>
            <div className={'cabinet-archive-selected'}>
                <ArchiveSelected selectedArchiveId={selectedArchiveId}/>
            </div>
        </div>
    </Page>;
}
