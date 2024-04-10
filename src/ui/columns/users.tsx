"use client"
import type {User} from "lucia"
import Link from "next/link";

import {ColorText} from "@app/utils";

import {ColumnDef} from "@tanstack/react-table";
import {Img} from "@components/img";


const Avatar = ({getValue, cell}: { getValue: Function, cell: { row: { original: User } } }) => {
	const photo = getValue()
	const {name} = cell.row.original

	return (
			<Link href={`/user/${name}`}>
				<Img
						src={photo}
						alt="Ава"
						className="user_icon"
						width={55}
				/>
			</Link>
	)
}

const Name = ({getValue}: { getValue: Function }) => {
	const name: string = getValue()

	return (
			<Link href={`/user/${name}`}>
				{name}
			</Link>
	)
}

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "photo",
		header: "Ава",
		cell: Avatar,
		meta: {
			className: "center_text",
			notEditable: true
		}
	},
	{
		accessorKey: "name",
		header: "Ник",
		cell: Name
	},
	{
		accessorKey: "rating",
		header: "Рейтинг",
		meta: {
			type: "number",
		}
	},
	{
		accessorKey: "mostiki",
		header: "Мостики",
		meta: {
			type: "number",
		}
	},
	{
		accessorKey: "createdAt",
		header: "Создание",
		meta: {
			type: "date"
		}
	}
]