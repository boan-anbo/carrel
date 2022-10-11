import {File} from "../../../../../carrel_server_client/carrel/common/file/v1/file_v1_pb";
import React, {useState} from "react";
import {Button, DataView, Tag} from "primereact";
import {PlainMessage} from "@bufbuild/protobuf";
import {parseISO} from "date-fns";
import {Logger, LogSource} from "../../../../../utils/logger";
import {Firefly} from "../../../../../carrel_server_client/carrel/common/firefly/v2/firefly_v2_pb";
import {DataViewPageParams} from "primereact/dataview";
import {ApiStandardQuery} from "../../../../../server-api/query_utils";
import {carrelApi} from "../../../../../server-api/carrel-api";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";

const LOG = new Logger(LogSource.FileDatatable)


export function FireflyDataview(props: {}) {

    const workingProject = useSelector((state: RootState) => state.workingProject.workingProject);

    const [totalRecords, setTotalRecords] = useState<number>(0);

    const [fireflies, setFireflies] = useState<Firefly[]>([]);

    const [first, setFirst] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(false);

    const statusBodyTemplate = (rowData: PlainMessage<File>) => {
        return <div
            className={`text-center text-xs product-badges status-${rowData.isMissingFile}`}>{rowData.isMissingFile ?
            <Tag severity="danger" value="Broken"></Tag> :
            <Tag className="mr-2" severity="success" value="Linked"></Tag>}</div>;
    };

    const fileBodyTemplate = (rowData: PlainMessage<File>) => {
        return <div className="truncate">{
            // restrict the length of file names
            rowData.fileName.length > 60 ? rowData.fileName.substring(0, 50) + "..." : rowData.fileName
        }</div>;
    }

    const createdBodyTemplate = (rowData: PlainMessage<File>) => {
        return <div className="truncate">{
            // restrict the length of file names
            parseISO(rowData.createdAt).toLocaleString()
        }</div>
    }

    const pageIdTemplate = (rowData: PlainMessage<File>) => {
        return <div className="truncate">{
            // restrict the length of file names
            Number(rowData.id).toLocaleString()
        }
        </div>
    }

    const onPage = async (event: DataViewPageParams) => {

        if (workingProject?.directory) {

            const query = ApiStandardQuery.DataViewPageParamsToApiStandardQuery(event);
            LOG.info("onPage", "event", event);

            const result = await carrelApi.queryFireflies({
                query: query,
                projectDirectory: workingProject.directory
            });

            LOG.info("onPage", "result", result);

            setFirst(result.responseMetadata?.query?.offset || 0);
            setFireflies(result.fireflies);
            setTotalRecords(result.responseMetadata?.totalResultCount || 0);
            setLoading(false);
        }
    }


    return (
        <div>
            <Button onClick={()=>onPage({
                first: 0, page: 0, pageCount: 0, rows: 10

            })}>Test</Button>

            <DataView
                first={first}
                lazy
                value={fireflies}
                layout={'grid'}
                rows={20}
                totalRecords={totalRecords}
                loading={loading}
                onPage={onPage}
                style={{fontSize: '0.8rem'}}
            >

            </DataView>


        </div>
    );
}
