import { Container, Heading, Text } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import clsx from "clsx";
import * as styles from "./CarrelDataTableRender.module.scss";
import { CarrelDataTableInternalParams } from "./i-carrel-data-table-params";

export const CarrelDataTableDisplay = (props: CarrelDataTableInternalParams<any>) => {

    if (!props.table) {
      return <div>No data</div>;
    }
    
    return (
      <Container h='full' w='full' p='0' maxH='full' maxW="100%">
        <table className={styles.table}>
          <thead>
            {props.table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    colSpan={header.colSpan}
                    style={{
                      width: header.getSize(),
                    }}
                    key={header.id}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        <Heading fontWeight='normal' fontSize='xs' color='primaryTextMute'>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </Heading>
                      </div>
                    )}

                    {/* Resizer */}
                    <div
                      className={clsx(
                        header.column.getIsResizing() ? "isResizing" : "",
                        styles.resizer
                      )}
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        style: {
                          //   transform: header.column.getIsResizing()
                          //     ? `translateX(${
                          //         props.table.getState().columnSizingInfo
                          //           .deltaOffset
                          //       }px)`
                          //     : "",
                        },
                      }}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {props.table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    <Text fontSize='xs' color='primaryText'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Text>
                  </td>
                ))}{" "}
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    );
}
