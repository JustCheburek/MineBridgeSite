"use client";

// React
import {
    Dispatch,
    MouseEvent,
    PropsWithChildren,
    ReactNode,
    SetStateAction,
    useEffect,
    useLayoutEffect,
    useState
} from "react";
import {
    Cell,
    ColumnDef,
    ColumnMeta,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel, getSortedRowModel, HeaderGroup,
    PaginationState,
    Row, SortingState,
    useReactTable
} from "@tanstack/react-table";
import {useUrlState} from "state-in-url";
import TimeAgo from "javascript-time-ago";
import ru from "javascript-time-ago/locale/ru";
import {Number} from "@components/number";

// Стили
import styles from "./styles/table.module.scss"

// Utils
import {ColorText} from "@app/utils";
import {FormButton, FormInput, FormLabel} from "@components/form";
import {Button} from "@components/button";
import { HookButton } from "@components/hookbutton";

TimeAgo.addLocale(ru);
const timeAgo = new TimeAgo("ru-RU");

type Table<T> = {
    columns: ColumnDef<T>[]
    data: T[]
    editable?: boolean
    setModal?: (value: boolean) => void
    notFound?: ReactNode
    _id?: string
    SaveAll?: (_id: string, data: T[]) => void
    pagination?: boolean
}

export function Table<T>(
    {
        columns,
        data: defaultData,
        editable = false,
        setModal,
        notFound,
        SaveAll,
        _id,
        children,
        pagination = false,
    }: PropsWithChildren<Table<T>>
) {
    const [data, setData] = useState(() => [...defaultData])
    const [originalData, setOriginalData] = useState(() => [...defaultData])
    const [editingRows, setEditingRows] = useState({})
    const {
        urlState: {globalFilter, pageIndex},
        setUrl,
        setState
    } = useUrlState(
        {
            globalFilter: "",
            pageIndex: 0,
            pageSize: 20
        }
    );
    const [sorting, setSorting] = useState<SortingState>([]);

    function extractDefaultSorting(columns: any[]): SortingState {
        return columns
            .filter(col => col.meta?.defaultSort)
            .map(col => ({
                id: col.id ?? col.accessorKey,
                desc: col.meta.defaultSort === "desc"
            }))
    }

    useLayoutEffect(() => {
        setSorting(extractDefaultSorting(columns))
    }, [])

    const table = useReactTable<T>({
        data,
        columns,
        defaultColumn: {enableSorting: true},
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
        getSortedRowModel: getSortedRowModel(),
        state: {
            globalFilter,
            pagination: pagination ? ({pageIndex, pageSize: 20} as PaginationState) : undefined,
            sorting
        },
        onGlobalFilterChange: (value) => setState({globalFilter: value, pageIndex: 0}),
        // @ts-ignore
        onPaginationChange: setUrl,
        manualPagination: false,
        onSortingChange: setSorting
    });

    if (!data.length && notFound) {
        return (
            <div className="center_text">
                {children}
                {editable && setModal
                    ? <Button onClick={() => setModal(true)}>Добавить</Button>
                    : notFound
                }
            </div>
        )
    }

    const updateEditingRows = (rowIndex: number) => {
        setEditingRows((old: []) => ({
            ...old,
            [rowIndex]: !old[rowIndex],
        }));
    }

    const confirmData = (rowIndex: number) => (
        (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            updateEditingRows(rowIndex)

            setOriginalData(old =>
                old.map((row, index) =>
                    index === rowIndex
                        ? data[rowIndex]
                        : row
                )
            )

            SaveAll && _id && SaveAll(_id, data)
        }
    )

    const cancelData = (rowIndex: number) => (
        (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            updateEditingRows(rowIndex)

            setData(old =>
                old.map((row, index) =>
                    index === rowIndex
                        ? originalData[rowIndex]
                        : row
                )
            );
        }
    )

    const removeRows = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const selectedRows = table.getSelectedRowModel().rows.map(row => row.index)
        const setFilterFunc = (old: T[]) => (
            old.filter((_row, index) => !selectedRows.includes(index))
        )

        setData(setFilterFunc)
        setOriginalData(setFilterFunc)

        SaveAll && _id && SaveAll(_id, data.filter((_row, index) => !selectedRows.includes(index)))

        table.resetRowSelection()
    }

    function Header({header}: { header: HeaderGroup<T>['headers'][0] }) {
        const sortItem = sorting.find(s => s.id === header.column.id);
        return (
            <th
                scope="col"
                className={`${styles.th} ${styles.header}`}
                onClick={header.column.getToggleSortingHandler()}
                style={{cursor: header.column.getCanSort() ? 'pointer' : 'default'}}
            >
                {flexRender(header.column.columnDef.header, header.getContext())}
                {sortItem && (sortItem.desc ? ' ↓' : ' ↑')}
            </th>
        );
    }

    const PaginationControls = () => {
        const pageCount = table.getPageCount();
        const current = table.getState().pagination.pageIndex;
        const start = Math.max(0, current - 2);
        const end = Math.min(pageCount, start + 5);
        return (
            <div className={styles.pagination}>
                <button
                    onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}
                    className={styles.start}
                >
                    &laquo;
                </button>
                <div className={styles.buttons}>
                    {Array.from({length: end - start}).map((_, i) => {
                        const idx = start + i;
                        return (
                            <button
                                key={idx}
                                className={` ${current === idx ? 'bold-font' : ''}`}
                                onClick={() => table.setPageIndex(idx)}
                            >
                                <Number removeM>
                                    {idx + 1}
                                </Number>
                            </button>
                        );
                    })}
                </div>
                <button
                    onClick={() => table.setPageIndex(pageCount - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    &raquo;
                </button>
            </div>
        );
    };

    return (
        <div className={styles.table_container}>
            <div className={`center_text ${styles.caption}`}>{children}</div>
            <FormLabel>
                <FormInput
                    value={globalFilter}
                    onChange={e =>
                        setState({globalFilter: e.target.value})
                    }
                    onBlur={e =>
                        table.setGlobalFilter(e.target.value)
                    }
                    placeholder="Начнём искать вместе..."
                />
            </FormLabel>

            {pagination && <PaginationControls/>}

            <table className={styles.table}>
                <thead className={styles.thead}>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className={styles.tr}>
                        {headerGroup.headers.map(header => (
                            <Header key={header.id} header={header}/>
                        ))}
                        {editable &&
                          <th scope="col" className={styles.th}>
                            ✐
                          </th>
                        }
                    </tr>
                ))}
                </thead>
                <tbody className={styles.tbody}>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className={styles.tr}>
                        {row.getVisibleCells().map(cell => {
                            const value = cell.getValue<string | number>()
                            const {columnDef} = cell.column

                            let meta = columnDef.meta || {}
                            if (!meta?.type) {
                                meta.type = "text"
                            }
                            const isNumber = meta?.type === "number"
                            const isDate = meta?.type === "date"

                            const number = isNumber && `semibold-font ${ColorText(value as number)}`

                            const center = isNumber || isDate
                            const center_text = center && "center_text"

                            const className = `${center_text || ""} ${number || ""} ${meta?.className || ""}`

                            return (
                                <td
                                    key={cell.id}
                                    className={`${styles.td} ${className}`}
                                >
                                    <Value<T>
                                        cell={cell}
                                        row={row}
                                        editingRows={editingRows}
                                        value={value}
                                        className={className}
                                        setData={setData}
                                        meta={meta}
                                        columnDef={columnDef}
                                    />
                                </td>
                            )
                        })}
                        {editable &&
                          <td className={`center_text ${styles.td}`}>
                            <div className={styles.func_buttons}>
                                {/* @ts-ignore */}
                                {editingRows[row.id]
                                    ? <>
                                        <button onClick={confirmData(row.index)} name="done" className="green_color"
                                                type="submit">
                                            ✔
                                        </button>
                                        {' '}
                                        <button onClick={cancelData(row.index)} name="cancel" className="red_color"
                                                type="submit">
                                            x
                                        </button>
                                    </>
                                    : <button
                                        onClick={e => {
                                            e.preventDefault()
                                            updateEditingRows(row.index)
                                        }}
                                        name="edit" type="submit"
                                    >
                                        ✐
                                    </button>
                                }
                              <input
                                type="checkbox"
                                checked={row.getIsSelected()}
                                onChange={row.getToggleSelectedHandler()}
                              />
                            </div>
                          </td>
                        }
                    </tr>
                ))}
                </tbody>
                {editable &&
                  <tfoot className={styles.tfoot}>
                  <tr className={styles.tr}>
                    <th colSpan={table.getCenterLeafColumns().length - 1} className={styles.th}>
                        {table.getSelectedRowModel().rows.length > 0 &&
                          <HookButton className="red_color" onClick={removeRows} danger>
                            Удалить выделенное
                          </HookButton>
                        }
                    </th>
                    <th colSpan={table.getCenterLeafColumns().length} className={styles.th}>
                        {setModal &&
                          <FormButton onClick={e => {
                              e.preventDefault()
                              setModal(true)
                          }}>
                            Добавить
                          </FormButton>
                        }
                    </th>
                  </tr>
                  </tfoot>
                }
            </table>

            {pagination && <PaginationControls/>}
        </div>
    );
}

type Value<T> = {
    cell: Cell<T, unknown>
    row: Row<T>
    editingRows: any
    setData: Dispatch<SetStateAction<T[]>>
    className: string
    value: string | number
    meta: ColumnMeta<T, unknown>
    columnDef: ColumnDef<T>
}

function Value<T>({cell, row, editingRows, setData, className, value, meta, columnDef}: Value<T>) {
    const [time, setTime] = useState("...")

    useEffect(() => {
        if (meta?.type === "date") {
            const timer = setInterval(() => {
                setTime(timeAgo.format(new Date(value), "mini"))
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [value, meta?.type])

    if (meta?.type === "date") {
        return time
    }

    // @ts-ignore
    if (!editingRows[row.id] || meta?.notEditable) {
        return flexRender(columnDef.cell, cell.getContext())
    }

    return (
        <input
            name={cell.column.id}
            type={meta.type}
            className={className}
            onChange={e => {
                let value: string | number = e.target.value

                if (meta?.type === "number") {
                    value = e.target.valueAsNumber
                }

                const rowIndex = row.index

                setData(old =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex],
                                [cell.column.id]: value,
                            };
                        }
                        return row;
                    })
                )
            }}
            defaultValue={value}
            required
        />
    )
}