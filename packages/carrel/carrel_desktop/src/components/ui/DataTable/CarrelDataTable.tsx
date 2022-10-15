import { Box, Button, Center, Container, Heading, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { ColumnDef, ColumnFiltersState, ColumnResizeMode, getCoreRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, PaginationState, SortingState, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useReducer, useState } from "react";
import { StandardQuery } from "../../../carrel_server_client/generic/api/query/v1/query_v1_pb";
import { StandardQueryHelper } from "../../../server-api/query_utils";
import { Logger, LogSource } from "../../../utils/logger";
import { IndeterminateCheckbox } from "./CarrelDataCheckBox";
import { CarrelDataPaginator } from "./CarrelDataPaginator";
import { CarrelDataTableDisplay } from "./CarrelDataTableRender";

const LOG = new Logger(LogSource.CarrelDataTable);
export interface CarraDadaTableParams {
  
  columns: ColumnDef<any>[];
  onQueryChange?: (query: StandardQuery) => void;
  children?: React.ReactNode;
  resultTotalPages?: number;
  data: any[] | undefined;
  paginatorPositions?: 'top' | 'bottom' | 'both';
  pageSize?: number;
  /**
   * The refreshKey will trigger a reset of values and reload the first page of data
   * E.g. passing down archiveId as refreshKey, then changing the archiveId will trigger a reload of the data
  */
  refreshKey?: string;
};

export const CarrelDataTable = (
    props: CarraDadaTableParams
) => {
    const rerender = useReducer(() => ({}), {})[1]

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
      []
    )
    const [globalFilter, setGlobalFilter] = useState('')

    const [sorting, setSorting] = useState<SortingState>([])

    // resizing info
    const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>('onChange')

    const [{pageIndex, pageSize}, setPagination] =
        useState<PaginationState>({
            pageIndex: 0,
            pageSize: props.pageSize ?? 10,
        });

        const pagination = useMemo(
      () => ({
        pageIndex,
        pageSize,
      }),
      [pageIndex, pageSize]
    );


    useEffect(() => {

      // reload query when pagination changes
    const query = StandardQueryHelper.fromPageChange(
      pageIndex,
      pageSize,
      sorting,
      globalFilter
    );
      // emit the new query for the upper level to handle, i.e. to feed to the data source.
      if (props.onQueryChange) {

        LOG.info("Query changed: ", 'query changed', sorting) ;
        props.onQueryChange(query);
      }

      return () => {
      }
    }, [pagination, sorting, globalFilter])

    const resetPaginationValues = () => {
      setColumnFilters([]);
      setGlobalFilter("");
      setSorting([]);
      setPagination({
        pageIndex: 0,
        pageSize: props.pageSize ?? 10,
      });
    }
    // load first page when archive id changes
    useEffect(() => {
      resetPaginationValues();
    }, [props.refreshKey]);
      
    
    
    const calculatedColumns = useMemo<ColumnDef<any, unknown>[]>(() => {
      if (props.columns) {
        const checkBoxColumn  =  {
          id: "select",
          header: ({ table }) => (
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          ),
          cell: ({ row }) => (
            <Center>
              <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />
            </Center>
          ),
          size: 0, // minimal size
          enableResizing: false, // check box does not allow resizing
        }
        const columsWithCheckbox = [checkBoxColumn ,...props.columns] ?? [];
        return columsWithCheckbox;
      } else {
        return props.columns;
      }
    }, [props.columns])

    const [rowSelection, setRowSelection] = useState({});
    // create table instance

    if (!props.columns) {
        return <Text>no valid column definition provided</Text>;
    }

    const table = useReactTable({
        data: props.data || [],
        columns: calculatedColumns,
        columnResizeMode,
        pageCount: props.resultTotalPages || -1, // use returned metadata to calculate page count
        getCoreRowModel: getCoreRowModel(),
        state: {
            pagination,
            rowSelection,
            sorting,
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination, // when use click a page, update the page index and page size, it will trigger a new query change and then the query change will trigger a new data fetch
        manualPagination: true,
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
        enableRowSelection: true,
        enableMultiRowSelection: true,
    });

    return (
      <Container p="0" m="0" w="full" h="full" maxW="full">
        <VStack spacing="0" p="0" m="0"  h="full">
          <Box w='full'>
            <Input
              m="0"
              p="0"
              size="xs"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder={"Global filter"}
            />
          </Box>
          <Box w='full'>
            {props.paginatorPositions === "top" ||
            props.paginatorPositions === "both" ? (
              <CarrelDataPaginator table={table} />
            ) : null}
          </Box>
          <Box h='full' w='full'>
            <CarrelDataTableDisplay {...props} table={table} />
          </Box>
          <Box w='full'>
            {props.paginatorPositions === "bottom" ||
            props.paginatorPositions === "both" ? (
              <CarrelDataPaginator table={table} />
            ) : null}
          </Box>
        </VStack>
      </Container>
    );
}
