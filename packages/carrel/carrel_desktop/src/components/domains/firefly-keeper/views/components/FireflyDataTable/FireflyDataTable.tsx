import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { ReactNode, useMemo } from 'react';
import { Firefly } from '../../../../../../carrel_server_client/carrel/common/firefly/v2/firefly_v2_pb';
import { StandardQuery } from '../../../../../../carrel_server_client/generic/api/query/v1/query_v1_pb';
import { CarrelDataTable } from '../../../../../ui/DataTable/CarrelDataTable';
import { CommentCell } from './CommentCell';


export interface FireflyDataTableProps {
    isMock?: boolean;
    projectDirectory: string;
    fireflies: Firefly[];
    totalPages: number;
    onQueryChange: (query: StandardQuery) => void;
}

const columnHelper = createColumnHelper<Firefly>();

export function FireflyDataTable({projectDirectory, fireflies, totalPages, onQueryChange}: FireflyDataTableProps) {

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
s

    return (
        <CarrelDataTable
            paginatorPositions="both"
            columns={columns}
            data={fireflies}
            resultTotalPages={totalPages}
            onQueryChange={onQueryChange}
        ></CarrelDataTable>
    );
}
