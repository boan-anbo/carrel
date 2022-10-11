import {File} from "../../../../../carrel_server_client/carrel/common/file/v1/file_v1_pb";
import {DataTablePFSEvent} from "primereact/datatable";
import React, {useEffect, useState} from "react";
import {Button, Column, DataTable, FilterMatchMode, FilterOperator, InputText, ProgressBar, Tag} from "primereact";
import {PlainMessage} from "@bufbuild/protobuf";
import {parseISO} from "date-fns";
import {PaginatorTemplateOptions} from "primereact/paginator";
import {Logger, LogSource} from "../../../../../utils/logger";

const LOG = new Logger(LogSource.FileDatatable)
export function FileDatatable(props: {
    files: File[] | undefined,
    totalRecords: number | undefined,
    onLazyParamsChanged: (lazyParams: DataTablePFSEvent) => void,
    lazyParams: DataTablePFSEvent,
    onRefetch: () => void,
}) {



    const [selectedFiles, setSelectedFiles] = useState(null);
    const [selectAll, setSelectAll] = useState(false);


    // current global filter value, e.g. 'John' to filter all columns that have 'John' in them
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const clearFilter1 = () => {
        initGlobalFilter();
    };
    /**
     * Initialize the global filter to filter across all filterable columns.
     */
    const initGlobalFilter = () => {
        const initialGlobalFilterSetting = {
            'global':
                {
                    value: null,
                    matchMode: FilterMatchMode.CONTAINS
                },
            fileName: {
                operator: FilterOperator.AND,
                constraints: [
                    {
                        value: null,
                        matchMode: FilterMatchMode.STARTS_WITH
                    }
                ]
            },

        }
        props.onLazyParamsChanged(
            {
                ...props.lazyParams,
                filters: initialGlobalFilterSetting
            }
        );
        setGlobalFilterValue('');
    };

    useEffect(() => {

        props.onRefetch();
    }  , [props.lazyParams])


    const onGlobalFilterChange1 = (e: any) => {
        const value = e.target.value;
        let _filters1 = props.lazyParams.filters;

        _filters1['global'] = value;

        props.onLazyParamsChanged(
            {
                ...props.lazyParams, filters: _filters1
            }
        );
        setGlobalFilterValue(value);
    };


    const renderTableHeader = () => {
        return (
            <div>
                <div className="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" className="p-button-outlined p-button-sm "
                            onClick={clearFilter1}/>
                    <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText

                        size={30}
                        value={globalFilterValue} onChange={onGlobalFilterChange1}
                        placeholder="Keyword Search"/>
                </span>

                    {
                        selectedFiles?.length > 0 && <div className={'text-lg m-auto'}>
                            Selected {selectedFiles?.length} files
                        </div>
                    }
                </div>
                <ProgressBar mode="indeterminate" style={{height: '1px'}}></ProgressBar>
            </div>
        );
    };
    const renderFooter1 = () => {
        return (
            <div className="flex justify-content-between">
                <div>
                    Total Records = {props.totalRecords}
                </div>
            </div>
        );
    }
    const tableHeader = renderTableHeader();

    const tableFooter = renderFooter1();

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

    const onPage = (event: any) => {
        props.onLazyParamsChanged(event);
    }

    const onSelectionChange = (event: any) => {
        const value = event.value;
        setSelectedFiles(value);
        console.log("onSelectionChange", value);
        setSelectAll(value.length === props.totalRecords);
    }
    const onSelectAllChange = (event: any) => {
        const selectAll = event.checked;

        if (selectAll) {
            // archiveFileService.getFiles().then(data => {
            //     setSelectAll(true);
            //     setSelectedFiles(data.files);
            // });
        } else {
            setSelectAll(false);
            setSelectedFiles([]);
        }
    }
    const onSort = (event: DataTablePFSEvent) => {
        LOG.info("onSort", "event", event);
        props.onLazyParamsChanged(event);
    }

    const onFilter = (event: DataTablePFSEvent) => {
        event['first'] = 0; // reset the starting page to 0
        props.onLazyParamsChanged(event);
    }
    const paginatorOptions: PaginatorTemplateOptions = {
        CurrentPageReport: undefined,
        FirstPageLink: undefined,
        JumpToPageInput: undefined,
        LastPageLink: undefined,
        NextPageLink: undefined,
        PageLinks: undefined,
        PrevPageLink: undefined,
        RowsPerPageDropdown: 10,
        layout: ""

    }

    return (
        <div>

            <DataTable
                first={props.lazyParams.first}

                paginator={true}

                lazy

                height={'900px'}
                width={'90%'}
                value={props.files}
                size='small'


                rows={20}

                totalRecords={props.totalRecords}

                // selection

                selection={selectedFiles}
                onSelectionChange={onSelectionChange}
                onSelectAllChange={onSelectAllChange}
                selectAll={selectAll}

                onPage={onPage}
                filters={props.lazyParams.filters}
                filterDisplay="menu"
                onFilter={onFilter}

                // show total

                style={{fontSize: '0.8rem'}}

                className="p-datatable-customers"
                showGridlines
                // scrollable scrollHeight="800px"
                dataKey="id"
                responsiveLayout="scroll"


                globalFilterFields={['fileName']}


                header={tableHeader}
                footer={tableFooter}

                emptyMessage="No files found."
                sortField={props.lazyParams.sortField}
                sortOrder={props.lazyParams.sortOrder}
                onSort={onSort}

                paginatorTemplate={{
                    ...paginatorOptions
                }}


            >
                {/* Selecteion check box*/}
                <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>

                {/*Id column*/}
                <Column field="id" body={pageIdTemplate} header="Id" sortable={true} filter={true}
                        filterMatchMode="contains" filterPlaceholder="Id" headerStyle={{width: '5em'}}></Column>

                {/* File column */}
                <Column

                    resizeable={true}
                    field="fileName"
                    body={fileBodyTemplate} header="File" sortable filter filterPlaceholder="Search by description"/>
                <Column field="importance" header="Importance" sortable filterPlaceholder="Search by importance"/>
                <Column resizeable style={{width: '25px'}} field="extension" header="Extension" sortable filter
                        filterPlaceholder="Search by extension"/>

                <Column dataType={'text'}

                        field="isMissingFile" header="Broken" body={statusBodyTemplate} sortable
                        filterPlaceholder="Search by is missing file"/>


                <Column header="Created"
                        field={'createdAt'} // this is needed for sorting when using a custom body
                        dataType={"date"} body={createdBodyTemplate} sortable filterPlaceholder="Search by created at"/>

                <Column field="isOutOfSync" header="Unsynced" sortable
                        filterPlaceholder="Search by is out of sync"/>

                <Column field="taskState" header="Task" sortable filter filterPlaceholder="Search by task state"/>

            </DataTable>


        </div>
    );
}
