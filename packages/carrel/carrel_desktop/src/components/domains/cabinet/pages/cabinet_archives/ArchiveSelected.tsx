import {useQuery} from "@tanstack/react-query";

import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import React, {useEffect, useState} from "react";
import {File} from "../../../../../carrel_server_client/carrel/common/file/v1/file_v1_pb";
import {ApiStandardQuery} from "../../../../../server-api/query_utils";
import {carrelApi} from "../../../../../server-api/carrel-api";
import {
    QueryFilesRequest
} from "../../../../../carrel_server_client/carrel/server/project_manager/v1/server_project_manager_v1_pb";
import {Logger, LogSource} from "../../../../../utils/logger";
import {DataTablePFSEvent} from "primereact/datatable";
import {FileDatatable} from "./FileDatatable";


const LOG = new Logger(LogSource.ArchiveTable)

export function ArchiveSelected(props: {
    selectedArchiveId: number | null,

}) {

    useEffect(() => {
        loadData();
    }   , [props.selectedArchiveId])
    const [files, setFiles] = useState<File[]>([]);


    const [totalRecords, setTotalRecords] = useState(0);


    const loadData = async () => {
        {
            LOG.info("The datatable is loading lazy data", "loading data", lazyParams);

            if (workingProject?.directory && props.selectedArchiveId) {


                let query = ApiStandardQuery.QueryArchiveFiles(lazyParams, props.selectedArchiveId);
                let request = new QueryFilesRequest();

                request.projectDirectory = workingProject?.directory;
                request.query = query;

                LOG.info("Query files request", "request", request);

                try {

                    let result = await carrelApi.queryFiles(
                        request,
                    );

                    LOG.info("Query files result", "result", result);

                    const {files, responseMetadata} = result;
                    let total_count = responseMetadata?.totalResultCount || 0;
                    setTotalRecords(total_count);
                    setFiles(files);
                    console.log("total_count", total_count);

                    // return result;
                } catch (e) {
                    LOG.error("Error loading files", "error", e);
                }
            } else {
                LOG.error("No query or project directory", "query");
            }
        }
    }

    const workingProject = useSelector((state: RootState) => state.workingProject.workingProject);



    const [lazyParams, setLazyParams] = useState<DataTablePFSEvent>({
            multiSortMeta: undefined,
            pageCount: 0,
            first: 0,
            rows: 10,
            page: 1,
            sortField: "id",
            sortOrder: undefined,
            filters: {

                'id': {
                    value: '',
                    matchMode: 'contains'
                },
                'fileName': {
                    value: '',
                    matchMode: 'contains'
                }
            }
        }
    );


    return <div className={'w-full h-full'}>
        <FileDatatable

            onRefetch={() => loadData()}

            lazyParams={lazyParams}

            totalRecords={totalRecords}

            files={files}

            onLazyParamsChanged={(lazyParams) => {
            setLazyParams(lazyParams);
        }
        }/>

    </div>;


}


export default ArchiveSelected;
