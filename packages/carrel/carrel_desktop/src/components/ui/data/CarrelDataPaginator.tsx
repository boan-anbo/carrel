import {CarrelDataTableParams} from "./i-carrel-data-table-params";

export const CarrelDataPaginator = (props: CarrelDataTableParams<any>) => {
    return (
        <>

            <div className="flex items-center gap-2">
                <button
                    className="border rounded p-1"
                    onClick={() => props.table.setPageIndex(0)}
                    disabled={!props.table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => props.table.previousPage()}
                    disabled={!props.table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => props.table.nextPage()}
                    disabled={!props.table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => props.table.setPageIndex(props.table.getPageCount() - 1)}
                    disabled={!props.table.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {props.table.getState().pagination.pageIndex + 1} of{' '}
              {props.table.getPageCount()}
          </strong>
        </span>
                <span className="flex items-center gap-1">
          | Go to page:
          <input
              type="number"
              defaultValue={props.table.getState().pagination.pageIndex + 1}
              onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  props.table.setPageIndex(page)
              }}
              className="border p-1 rounded w-16"
          />
        </span>
                <select
                    value={props.table.getState().pagination.pageSize}
                    onChange={e => {
                        props.table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}
