import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import {useEffect, useMemo} from "react";
import {Tag} from "../../../../../carrel_server_client/carrel/common/tag/v1/tag_v1_pb";
import {PartialMessage} from "@bufbuild/protobuf";
import {FireflyCard} from "../../components/firefly/FireflyCard";
import './Fireflies.css';
import {Firefly} from "../../../../../carrel_server_client/carrel/common/firefly/v1/firefly_v1_pb";
import Page from "../../../../ui/page/Page";
import {setFireflies} from "../../../../../store/slices/firefly-keeper-state/firefly-keeper-store";
import {actionRefreshFireflies} from "../../../../../actions/action-refresh-fireflies";
import {Button} from "@blueprintjs/core";

export function Fireflies() {

    useEffect(() => {
        console.log("Fireflies");
    });
    const fireflies = useSelector((rootState: RootState) => rootState.fireflyKeeper.fireflies);


    const dispatch = useDispatch();

    const workingProject = useSelector((state: RootState) => state.workingProject.workingProject);

    const spotFireflies = async () => {
        dispatch(setFireflies(null));
        const fireflies = await actionRefreshFireflies(workingProject.workingFolder);
        dispatch(setFireflies(fireflies));
    }

    const selectedFirelies = (): PartialMessage<Tag>[] => useMemo(() => {
        return fireflies?.allFireflies ?? [];
    }, [fireflies]);

    const elements = selectedFirelies().map((firefly, index) => {
        return <FireflyCard firefly={firefly as Firefly} key={index}/>
    });

    return <Page>
        <Button onClick={spotFireflies}>Spot Fireflies</Button>
        <div className={'fireflies-list'}>
            {elements}
        </div>
    </Page>
}
