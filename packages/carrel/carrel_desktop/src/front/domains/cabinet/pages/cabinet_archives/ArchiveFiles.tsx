import { Box, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { File } from "../../../../../backend/carrel_server_client/carrel/common/file/v1/file_v1_pb";
import { StandardQuery } from "../../../../../backend/carrel_server_client/generic/api/query/v1/query_v1_pb";
import { carrelQueries } from "../../../../../backend/server-api/carrel-queries";
import { StandardQueryHelper } from "../../../../../backend/server-api/query_utils";
import { CarrelDataTable } from "../../../../../ui/components/DataTable/CarrelDataTable";
import { Logger, LogSource } from "../../../../../utils/logger";
import appstate from "../../../../store/slices/appstate/appstate";
import { RootState } from "../../../../store/store";

const LOG = new Logger(LogSource.ArchiveTable);

export interface ArchiveFilesProps {
  selectedArchiveId?: number | null;
  isMock?: boolean;
  projectDirectory?: string;
}

export function ArchiveFiles({
  selectedArchiveId,
  isMock,
  projectDirectory,
}: ArchiveFilesProps) {
  const workingProject = useSelector(
    (state: RootState) => state.workingProject.workingProject
  );

  const appState = useSelector((state: RootState) => state.appstate);

  const columns = useMemo<ColumnDef<File>[]>(
    () => [
      {
        accessorKey: "fileName",
        header: "File name",
        cell: (props) => (
          <Box>
            <Text fontSize={appState.globalSize}>
              {props.row.original.fileName}
            </Text>
          </Box>
        ),
      },
      {
        id: "metadata",
        header: () => "Metadata",
        footer: () => "Metadata footer",
      },
    ],
    []
  );

  const [query, setQuery] = useState<StandardQuery>();

  const loadData = (query: StandardQuery) => {
    if (appState.coreArchiveIdSelected) {
      query = StandardQueryHelper.addArchiveId(
        query,
        appState.coreArchiveIdSelected
      );
      console.log("loadData", query);
      setQuery(query);
    }
  };

  const { data, refetch } = carrelQueries.QueryFilesByArchiveId(
    query,
    projectDirectory ?? workingProject?.directory ?? null,
    appState.coreArchiveIdSelected,
    isMock
  );

  useEffect(() => {
    setQuery(undefined);
  }, [appState.coreArchiveIdSelected]);

  return (
    <Box>
      <CarrelDataTable
        size={appState.globalSize}
        pageSize={50}
        refreshKey={appState.coreArchiveIdSelected?.toString()}
        paginatorPositions="both"
        columns={columns}
        data={data?.files}
        resultTotalPages={data?.responseMetadata?.resultTotalPages ?? 0}
        onQueryChange={(query) => loadData(query)}
      ></CarrelDataTable>
    </Box>
  );
}

export default ArchiveFiles;
