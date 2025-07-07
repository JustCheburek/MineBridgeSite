'use client'

// React
import {
  Dispatch,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import {
  Cell,
  ColumnDef,
  ColumnMeta,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  HeaderGroup,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useUrlState } from 'state-in-url'
import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru'
import { Number } from '@components/number'

// Utils
import { cn, ColorText } from '@/lib/utils'
import { FormButton, FormInput, FormLabel } from '@components/form'
import { Button } from '@components/button'
import { HookButton } from '@components/hookbutton'

TimeAgo.addLocale(ru)
const timeAgo = new TimeAgo('ru-RU')

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

export function Table<T>({
  columns,
  data: defaultData,
  editable = false,
  setModal,
  notFound,
  SaveAll,
  _id,
  children,
  pagination = false,
}: PropsWithChildren<Table<T>>) {
  const [data, setData] = useState(() => [...defaultData])
  const [originalData, setOriginalData] = useState(() => [...defaultData])
  const [editingRows, setEditingRows] = useState({})
  const {
    urlState: { globalFilter, pageIndex },
    setUrl,
    setState,
  } = useUrlState({
    globalFilter: '',
    pageIndex: 0,
    pageSize: 20,
  })
  const [sorting, setSorting] = useState<SortingState>([])

  function extractDefaultSorting(columns: any[]): SortingState {
    return columns
      .filter(col => col.meta?.defaultSort)
      .map(col => ({
        id: col.id ?? col.accessorKey,
        desc: col.meta.defaultSort === 'desc',
      }))
  }

  useLayoutEffect(() => {
    setSorting(extractDefaultSorting(columns))
  }, [])

  const table = useReactTable<T>({
    data,
    columns,
    defaultColumn: { enableSorting: true },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
      pagination: pagination ? ({ pageIndex, pageSize: 20 } as PaginationState) : undefined,
      sorting,
    },
    onGlobalFilterChange: value => setState({ globalFilter: value, pageIndex: 0 }),
    // @ts-ignore
    onPaginationChange: setUrl,
    manualPagination: false,
    onSortingChange: setSorting,
  })

  if (!data.length && notFound) {
    return (
      <div className='text-center'>
        {children}
        {editable && setModal ? <Button onClick={() => setModal(true)}>Добавить</Button> : notFound}
      </div>
    )
  }

  const updateEditingRows = (rowIndex: number) => {
    setEditingRows((old: []) => ({
      ...old,
      [rowIndex]: !old[rowIndex],
    }))
  }

  const confirmData = (rowIndex: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    updateEditingRows(rowIndex)

    setOriginalData(old => old.map((row, index) => (index === rowIndex ? data[rowIndex] : row)))

    SaveAll && _id && SaveAll(_id, data)
  }

  const cancelData = (rowIndex: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    updateEditingRows(rowIndex)

    setData(old => old.map((row, index) => (index === rowIndex ? originalData[rowIndex] : row)))
  }

  const removeRows = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const selectedRows = table.getSelectedRowModel().rows.map(row => row.index)
    const setFilterFunc = (old: T[]) => old.filter((_row, index) => !selectedRows.includes(index))

    setData(setFilterFunc)
    setOriginalData(setFilterFunc)

    SaveAll &&
      _id &&
      SaveAll(
        _id,
        data.filter((_row, index) => !selectedRows.includes(index))
      )

    table.resetRowSelection()
  }

  function Header({ header }: { header: HeaderGroup<T>['headers'][0] }) {
    const sortItem = sorting.find(s => s.id === header.column.id)
    return (
      <th
        scope='col'
        onClick={header.column.getToggleSortingHandler()}
        className={cn(
          'py-4 px-6 whitespace-nowrap',
          { 'cursor-pointer': header.column.getCanSort() }
        )}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {sortItem && (sortItem.desc ? ' ↓' : ' ↑')}
      </th>
    )
  }

  const PaginationControls = () => {
    const pageCount = table.getPageCount()
    const current = table.getState().pagination.pageIndex
    const start = Math.max(0, current - 2)
    const end = Math.min(pageCount, start + 5)
    return (
      <div className="flex justify-center items-center gap-2 my-4 mx-auto">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="py-2 px-3 cursor-pointer disabled:opacity-50 disabled:cursor-default"
        >
          &laquo;
        </button>
        <div className="flex gap-2 justify-center items-center">
          {Array.from({ length: end - start }).map((_, i) => {
            const idx = start + i
            return (
              <button
                key={idx}
                className={current === idx ? 'font-bold' : ''}
                onClick={() => table.setPageIndex(idx)}
              >
                <Number>{idx + 1}</Number>
              </button>
            )
          })}
        </div>
        <button
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
          className="py-2 px-3 cursor-pointer disabled:opacity-50 disabled:cursor-default"
        >
          &raquo;
        </button>
      </div>
    )
  }

  return (
    <div className="max-md:overflow-x-auto">
      <div className="text-center mb-10">{children}</div>

      <FormLabel className='block max-sm:mx-2 sm:w-[70%] mx-auto'>
        <FormInput
          value={globalFilter}
          onChange={e => setState({ globalFilter: e.target.value })}
          onBlur={e => table.setGlobalFilter(e.target.value)}
          placeholder='Начнём искать вместе...'
        />
      </FormLabel>

      {pagination && <PaginationControls />}

      <table className="relative border-separate border-spacing-y-6 w-full">
        <thead className="bg-background/80 backdrop-blur-md z-10 lg:sticky lg:top-(--spacing-header) lg:-translate-y-0.25">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Header key={header.id} header={header} />
              ))}
              {editable && (
                <th scope='col' className="py-4 px-6 whitespace-nowrap">
                  ✐
                </th>
              )}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="even:bg-black/30">
              {row.getVisibleCells().map(cell => {
                const value = cell.getValue<string | number>()
                const { columnDef } = cell.column

                let meta = columnDef.meta || {}
                if (!meta?.type) {
                  meta.type = 'text'
                }
                const isNumber = meta?.type === 'number'
                const isDate = meta?.type === 'date'

                const number = isNumber && `font-semibold ${ColorText(value as number)}`

                const center = isNumber || isDate
                const textcenter = center && 'text-center'

                const className = `${textcenter || ''} ${number || ''} ${meta?.className || ''}`

                return (
                  <td key={cell.id} className={cn("py-4 px-2 text-wrap-balance first:rounded-l-[15px] last:rounded-r-[15px]", className)}>
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
              {editable && (
                <td className="text-center p-4 px-2 text-wrap-balance first:rounded-l-[15px] last:rounded-r-[15px]">
                  <div className="flex place-content-center gap-2.5">
                    {/* @ts-ignore */}
                    {editingRows[row.id] ? (
                      <>
                        <button
                          onClick={confirmData(row.index)}
                          name='done'
                          className='text-green'
                          type='submit'
                        >
                          ✔
                        </button>{' '}
                        <button
                          onClick={cancelData(row.index)}
                          name='cancel'
                          className='text-red'
                          type='submit'
                        >
                          x
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={e => {
                          e.preventDefault()
                          updateEditingRows(row.index)
                        }}
                        name='edit'
                        type='submit'
                      >
                        ✐
                      </button>
                    )}
                    <input
                      type='checkbox'
                      checked={row.getIsSelected()}
                      onChange={row.getToggleSelectedHandler()}
                    />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
        {editable && (
          <tfoot>
            <tr>
              <th colSpan={table.getCenterLeafColumns().length - 1} className="py-4 px-6 whitespace-nowrap">
                {table.getSelectedRowModel().rows.length > 0 && (
                  <HookButton className='text-red' onClick={removeRows} danger>
                    Удалить выделенное
                  </HookButton>
                )}
              </th>
              <th colSpan={table.getCenterLeafColumns().length} className="py-4 px-6 whitespace-nowrap">
                {setModal && (
                  <FormButton
                    onClick={e => {
                      e.preventDefault()
                      setModal(true)
                    }}
                  >
                    Добавить
                  </FormButton>
                )}
              </th>
            </tr>
          </tfoot>
        )}
      </table>

      {pagination && <PaginationControls />}
    </div>
  )
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

function Value<T>({
  cell,
  row,
  editingRows,
  setData,
  className,
  value,
  meta,
  columnDef,
}: Value<T>) {
  const [time, setTime] = useState('...')

  useEffect(() => {
    if (meta?.type === 'date') {
      const timer = setInterval(() => {
        setTime(timeAgo.format(new Date(value), 'mini'))
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [value, meta?.type])

  if (meta?.type === 'date') {
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

        if (meta?.type === 'number') {
          value = e.target.valueAsNumber
        }

        const rowIndex = row.index

        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [cell.column.id]: value,
              }
            }
            return row
          })
        )
      }}
      defaultValue={value}
      required
    />
  )
}
