import { useMemo } from "react";
import {
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnResizeMode,
  Updater,
  PaginationState,
  SortingState,
  getSortedRowModel,
  RowSelectionState,
} from "@tanstack/react-table";
import { userColumn } from "../../Types/user";
import { useState } from "react";
import "./TanstackTable.css";

type propType = {
  data: Array<userColumn>;
  columns: userColumn | any;
  paginationObj: {
    pageIdx: number;
    pageSize: number;
  };
  setPagination: (updater: Updater<PaginationState>) => void;
  loading: boolean;
};

export default function TanstackTable({
  columns,
  data,
  paginationObj,
  setPagination,
  loading,
}: propType) {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnResizeMode, setColumnResizeMode] =
    useState<ColumnResizeMode>("onChange");

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const pagination = useMemo(
    () => ({
      pageIndex: paginationObj.pageIdx,
      pageSize: paginationObj.pageSize,
    }),
    [paginationObj]
  );

  const table = useReactTable({
    columns,
    data,
    state: {
      columnVisibility,
      columnOrder,
      pagination,
      sorting,
      rowSelection,
    },
    pageCount: 10,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    columnResizeMode,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    manualPagination: true,
    enableRowSelection: true,
  });

  return (
    <div className="main_div">
      <div className="column_display_div">
        <div>
          {/* All Toggle checkbox */}
          <label>
            <input
              {...{
                type: "checkbox",
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{" "}
            Toggle All
          </label>
        </div>
        <div>
          {table?.getAllLeafColumns().map((column) => {
            return (
              <div key={column.id}>
                <label>
                  <input
                    {...{
                      type: "checkbox",
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                    }}
                  />{" "}
                  {column.id}
                </label>
              </div>
            );
          })}
        </div>
        <div>
          <select
            value={columnResizeMode}
            onChange={(e) =>
              setColumnResizeMode(e.target.value as ColumnResizeMode)
            }
            className="border p-2 border-black rounded"
          >
            <option value="onEnd">Resize: "onEnd"</option>
            <option value="onChange">Resize: "onChange"</option>
          </select>
        </div>
        <div>
          <code>{JSON.stringify(rowSelection)}</code>
        </div>
      </div>
      <div className="table_div">
        {loading && <div className="loading_div">Loading...</div>}
        {!loading && (
          <table
            {...{
              style: {
                width: table.getCenterTotalSize(),
              },
            }}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      {...{
                        key: header.id,
                        colSpan: header.colSpan,
                        style: {
                          width: header.getSize(),
                        },
                      }}
                    >
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        <div
                          {...{
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `resizer ${
                              header.column.getIsResizing() ? "isResizing" : ""
                            }`,
                            style: {
                              transform:
                                columnResizeMode === "onEnd" &&
                                header.column.getIsResizing()
                                  ? `translateX(${
                                      table.getState().columnSizingInfo
                                        .deltaOffset
                                    }px)`
                                  : "",
                            },
                          }}
                        />
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="pagination_div">
        <div>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
        <div>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((v) => (
              <option value={v}>Size of Page {v}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
