import Page from "../../../../ui/page/Page";
import {Fireflies} from "../../../../../../../carrel_server_client/generated/carrel/firefly_keeper/v1/firefly_keeper_v1_pb";
import {useEffect, useState} from "react";
import {fireflyKeeperApi} from "../../../../../server-utils/api-clients";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import {Button} from "@blueprintjs/core";
import {FirefliesStatTable} from "../../components/fireflies-stat-table/FirefliesStatTable";


export function FireflyHouse() {

    useEffect(() => {
        spotFireflies()
    }, []);
    const [fireflies, setFireflies] = useState<Fireflies | null>(null);


    const workingProject = useSelector((state: RootState) => state.workingProject.workingProject);

    const spotFireflies = async () => {
        setFireflies(null);
        const result = await fireflyKeeperApi.scanFolderForFireflies(
            {
                directoryPath: workingProject.workingFolder,
            }
        )
        if (result.fireflies) {
            const {fireflies} = result;
            setFireflies(fireflies);
        }

    }


    return <>
        <Page>
            <Button onClick={spotFireflies}>Spot Fireflies</Button>
            {fireflies && <FirefliesStatTable fireflies={fireflies}/>}

        </Page>
    </>;
}
