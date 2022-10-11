import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import './Fireflies.css';
import Page from "../../../../ui/page/Page";
import {Card, Column, DataTable, TabMenu} from "primereact";
import {useEffect, useState} from "react";
import {carrelQueries} from "../../../../../server-api/carrel-queries";
import { Firefly } from "../../../../../carrel_server_client/carrel/common/firefly/v2/firefly_v2_pb";
import {FireflyDataview} from "./FireflyDataView";
import {File} from "../../../../../carrel_server_client/carrel/common/file/v1/file_v1_pb";
import {ApiStandardQuery} from "../../../../../server-api/query_utils";
import {
    QueryFilesRequest, QueryFirefliesRequest
} from "../../../../../carrel_server_client/carrel/server/project_manager/v1/server_project_manager_v1_pb";
import {carrelApi} from "../../../../../server-api/carrel-api";
import {DataTablePFSEvent} from "primereact/datatable";
import {Logger, LogSource} from "../../../../../utils/logger";

const LOG = new Logger(LogSource.FireflyTable)
export function Fireflies() {

    const workingProject = useSelector((state: RootState) => state.workingProject.workingProject);



    return <Page>
        <div className={'space-y-4'}>
            {/*<TabMenu model={menuItems} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}/>*/}


            <Card>
                <FireflyDataview




                ></FireflyDataview>
            </Card>
        </div>
    </Page>
}
