import Page from "../../../../ui/page/Page";
import {useEffect, useState} from "react";
import {fireflyKeeperApi} from "../../../../../server-utils/api-clients";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import {Button} from "@blueprintjs/core";
import {FirefliesStatTable} from "../../components/fireflies-stat-table/FirefliesStatTable";
import {Fireflies} from "../../../../../carrel_server_client/carrel/firefly_keeper/v1/firefly_keeper_v1_pb";
import {actionRefreshFireflies} from "../../../../../actions/action-refresh-fireflies";
import {setFireflies} from "../../../../../store/slices/firefly-keeper-state/firefly-keeper-store";


export function FireflyHouse() {

    useEffect(() => {
        spotFireflies()
    }, []);
    const fireflies = useSelector((rootState: RootState) => rootState.fireflyKeeper.fireflies);

    const dispatch = useDispatch();


    const workingProject = useSelector((state: RootState) => state.workingProject.workingProject);

    const spotFireflies = async () => {
        dispatch(setFireflies(null));
        const fireflies = await actionRefreshFireflies(workingProject.workingFolder);
        dispatch(setFireflies(fireflies));
    }
    <Button onClick={spotFireflies}>Spot Fireflies</Button>

    return <>
        <Page>
            <Button onClick={spotFireflies}>Spot Fireflies</Button>

            {fireflies && <FirefliesStatTable fireflies={fireflies as Fireflies}/>}

        </Page>
    </>;
}
