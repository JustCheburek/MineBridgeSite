"use client";

import type {Dispatch, MouseEvent, PropsWithChildren, ReactNode, SetStateAction} from "react";
// React
import {useEffect, useState} from "react";
import type {Cell, ColumnDef, ColumnMeta, Row} from "@tanstack/react-table";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import TimeAgo from "javascript-time-ago";
import ru from "javascript-time-ago/locale/ru";

// Стили
import "./styles/table.scss"

// Utils
import {ColorText} from "@app/utils";
import {FormButton} from "@components/form";
import {Button} from "@components/button";

TimeAgo.addDefaultLocale(ru);
const timeAgo = new TimeAgo("ru-RU");

interface TableProps<T> {
	columns: ColumnDef<T>[]
	data: T[]
	editable?: false
	className?: string
	setModal?: undefined
	notFound?: undefined
	SaveAll?: undefined
}

interface EditableTableProps<T> {
	columns: ColumnDef<T>[]
	data: T[]
	className?: string
	setModal: (value: boolean) => void
	editable: boolean
	notFound: ReactNode
	SaveAll: Function
}

export function Table<T>(
		{
			columns,
			data: defaultData,
			editable = false,
			className = "",
			setModal=undefined,
			notFound=undefined,
			SaveAll=undefined,
			children
		}: PropsWithChildren<EditableTableProps<T> | TableProps<T>>
) {
	const [data, setData] = useState(() => [...defaultData])
	const [originalData, setOriginalData] = useState(() => [...defaultData])
	const [editingRows, setEditingRows] = useState({})

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
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

				SaveAll && SaveAll(data)
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

		SaveAll && SaveAll(data.filter((_row, index) => !selectedRows.includes(index)))

		table.resetRowSelection()
	}

	return (
			<div className="table_container">
				<table className={className}>
					<caption>{children}</caption>
					<thead>
					{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(header => (
										<th key={header.id} scope="col">
											{flexRender(
													header.column.columnDef.header,
													header.getContext()
											)}
										</th>
								))}
								{editable &&
										<th scope="col">
											✐
										</th>
								}
							</tr>
					))}
					</thead>
					<tbody>
					{table.getRowModel().rows.map(row => (
							<tr key={row.id}>
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
													className={className}
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
										<td className="center_text">
											<div className="func_buttons">
												{/* @ts-ignore */}
												{editingRows[row.id]
														? <>
															<button onClick={confirmData(row.index)} name="done" className="green_color"
															        type="submit">
																✔
															</button>
															{' '}
															<button onClick={cancelData(row.index)} name="cancel" className="red_color" type="submit">
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
							<tfoot>
							<tr>
								<th colSpan={table.getCenterLeafColumns().length - 1}>
									{table.getSelectedRowModel().rows.length > 0 &&
											<FormButton className="red_color" onClick={removeRows} danger>
												Удалить выделенное
											</FormButton>
									}
								</th>
								<th colSpan={table.getCenterLeafColumns().length}>
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