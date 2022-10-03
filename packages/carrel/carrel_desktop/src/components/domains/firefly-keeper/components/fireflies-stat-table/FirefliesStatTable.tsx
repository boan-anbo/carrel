import {PageSection} from "../../../../ui/page-section/PageSection";
import {HTMLTable} from "@blueprintjs/core";
import {Fireflies} from "../../../../../carrel_server_client/carrel/firefly_keeper/v1/firefly_keeper_v1_pb";

export function FirefliesStatTable(props: {
    fireflies: Fireflies
}) {
    return <PageSection sectionTitle={"All fireflies spotted"}>
        <div>Firefly house</div>

        <div>{props.fireflies?.directory}</div>

        <HTMLTable className={'w-full'}>
            {/* Table header */}
            <thead>
            <tr>
                <th>Files</th>
                <th>Count</th>
            </tr>
            <tbody>
            <tr>
                <td>All files</td>
                <td>{props.fireflies.filesCount}</td>
            </tr>
            <tr>
                <td>Text files</td>
                <td>{props.fireflies.textFilesCount}</td>
            </tr>
            </tbody>

            </thead>
            <thead>
            <tr>
                <th>Categories</th>
                <th>Count</th>
            </tr>
            </thead>
            {/* Table body */}
            <tbody>
            <tr>
                <td>ideas</td>
                <td>{props.fireflies.ideasCount}</td>
            </tr>
            <tr>
                <td>notes</td>
                <td>{props.fireflies.notesCount}</td>
            </tr>

            <tr>
                <td>points</td>
                <td>{props.fireflies.pointsCount}</td>
            </tr>
            <tr>
                <td>facts</td>
                <td>{props.fireflies.factsCount}</td>
            </tr>
            <tr>
                <td>quotes</td>
                <td>{props.fireflies.quotesCount}</td>
            </tr>
            <tr>
                <td>questions</td>
                <td>{props.fireflies.questionsCount}</td>
            </tr>
            <tr>
                <td>keywords</td>
                <td>{props.fireflies.keywordsCount}</td>
            </tr>
            <tr>
                <td>references</td>

                <td>{props.fireflies.referencesCount}</td>
            </tr>
            <tr>

                <td>opoints</td>
                <td>{props.fireflies.opointsCount}</td>
            </tr>
            <tr>
                <td>oevidences</td>

                <td>{props.fireflies.oevidencesCount}</td>
            </tr>
            <tr>
                <td>data</td>

                <td>{props.fireflies.dataCount}</td>
            </tr>
            <tr>
                <td>unclassified</td>

                <td>{props.fireflies.unclassifiedCount}</td>
            </tr>
            </tbody>
        </HTMLTable>


    </PageSection>;
}
