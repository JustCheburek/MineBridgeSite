"use client";

// React
import {PropsWithChildren} from "react";
import {type ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import TimeAgo from "javascript-time-ago";
import ru from "javascript-time-ago/locale/ru";

// Стили
import "./styles/table.scss"

TimeAgo.addDefaultLocale(ru);
const timeAgo = new TimeAgo("ru-RU");

type Table<T extends object> = {
	columns: ColumnDef<T>[]
	data: T[]
	className?: string
}

export function Table<T extends object>({columns, data, className = "", children}: PropsWithChildren<Table<T>>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

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
							</tr>
					))}
					</thead>
					<tbody>
					{table.getRowModel().rows.map(row => (
							<tr key={row.id}>
								{row.getVisibleCells().map(cell => {
									const {columnDef} = cell.column
									const {meta} = columnDef

									let className = meta?.className
									const isDate = meta?.isDate || false

									if (typeof className === "function") {
										className = className(cell.row.original)
									}

									return (
											<td
													key={cell.id}
													className={
														className
													}
											>
												{!isDate
														? flexRender(cell.column.columnDef.cell, cell.getContext())
														: timeAgo.format(new Date(cell.getValue() as string), "mini")
												}
											</td>
									)
								})}
							</tr>
					))}
					</tbody>
				</table>
			</div>
	);
}