// React
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";

// Стили
import "./styles/table.scss"

export function Table({columns, data, className="", children}) {
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
									const columnDef = cell.column.columnDef
									const meta = columnDef.meta

									let className = meta?.className
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
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
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