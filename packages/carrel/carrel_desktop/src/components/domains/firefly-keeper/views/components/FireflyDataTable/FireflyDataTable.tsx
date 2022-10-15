import {ColumnDef, createColumnHelper} from '@tanstack/react-table';
import React, {ReactNode, useMemo, useState} from 'react';
import {Firefly} from '../../../../../../carrel_server_client/carrel/common/firefly/v2/firefly_v2_pb';
import {StandardQuery} from '../../../../../../carrel_server_client/generic/api/query/v1/query_v1_pb';
import {carrelQueries} from '../../../../../../server-api/carrel-queries';
import {IndeterminateCheckbox} from '../../../../../ui/DataTable/CarrelDataCheckBox';
import {CarrelDataTable} from '../../../../../ui/DataTable/CarrelDataTable';
import {CommentCell} from './CommentCell';

import styles from './FireflyDataTable.module.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store/store";

export interface FireflyDataTableProps {
    isMock?: boolean;
}

const columnHelper = createColumnHelper<Firefly>();

export function FireflyDataTable(props: FireflyDataTableProps) {

    const workingProject = useSelector((state: RootState) => state.workingProject.workingProject);
    const columns = useMemo<ColumnDef<Firefly>[]>(
        () => [
            {
                accessorKey: "light",
                cell: (props) => props.getValue(),
            },
            {
                accessorKey: "comment",
                cell: (props) => <CommentCell>{props.getValue() as ReactNode}</CommentCell>,
            },
            {
                id: "metadata",
                header: () => "Metadata",
                footer: () => "Metadata footer",
            },
            {
                id: "matadata",
                header: () => "Actions",
                cell: (actions) => <div></div>,
            },
        ],
        []
    );
    const [query, setQuery] = useState<StandardQuery>();
    const loadData = (query: StandardQuery) => {
        setQuery(query);
    };

    const {data} = carrelQueries.QueryFireflies(query, workingProject?.directory, props.isMock);

    return (
        <CarrelDataTable
            paginatorPositions="both"
            columns={columns}
            data={data?.fireflies}
            resultTotalPages={data?.responseMetadata?.resultTotalPages}
            onQueryChange={(query) => loadData(query)}
        ></CarrelDataTable>
    );
}
