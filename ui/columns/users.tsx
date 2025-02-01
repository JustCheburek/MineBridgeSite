"use client"
import type {User} from "lucia"
import Link from "next/link";

import {ColumnDef} from "@tanstack/react-table";
import dynamic from "next/dynamic";
const Avatar = dynamic(() => import("@components/avatar"));


const AvatarBox = ({getValue, cell}: { getValue: Function, cell: { row: { original: User } } }) => {
    const photo: string = getValue()
    const {name} = cell.row.original

    return (
        <Link href={`/user/${name}`}>
            <Avatar src={photo} width={60}/>
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
        cell: AvatarBox,
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