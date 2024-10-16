// React
import type {Metadata} from "next";
import type {User} from "lucia";
import {getUsers} from "@/services";

// Компоненты
import {Table} from "@components/table"
import {MaxSize} from "@components/maxSize";
import {columns} from "@columns/users"
import {revalidateTag} from "next/cache";
import {H1} from "@components/h1";

export const metadata: Metadata = {
    title: "Игроки",
    description: "Братья и сёстры всея Майнбридж!",
	openGraph: {
		title: "Игроки",
		description: "Братья и сёстры всея Майнбридж!",
	},
	twitter: {
		title: "Игроки",
		description: "Братья и сёстры всея Майнбридж!",
	}
};

export default async function Component() {
    const users = await getUsers()

    return (
        <MaxSize>
            <H1 up reload={async () => {
                "use server";
                revalidateTag("users")
            }}>
                Игроки
            </H1>
            <Table<User>
                columns={columns}
                data={users}
            />
        </MaxSize>
    )
}