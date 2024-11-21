// React
import type {Metadata} from "next";
import type {User} from "lucia";
import {getUsers} from "@/services";
import {revalidateTag} from "next/cache";

// Компоненты
import {Table} from "@components/table"
import {MaxSize} from "@components/maxSize";
import {columns} from "@columns/users"
import {H1} from "@components/h1";

export const generateMetadata = async (): Promise<Metadata> => {
    const usersL = (await getUsers()).length

    return {
        title: "Игроки",
        description: `Братья и сестры всея Майнбридж! Игроков всего-то ${usersL}...`
    }
}

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