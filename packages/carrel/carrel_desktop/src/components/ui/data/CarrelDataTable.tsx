import {flexRender} from "@tanstack/react-table";
import {CarrelDataTableParams} from "./i-carrel-data-table-params";

export const CarrelDataTable = (props: CarrelDataTableParams<any>) => {
    return (
        <>
            <table>
                <thead>
                {props.table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {props.table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())
                                }
                            </td>))} </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}
