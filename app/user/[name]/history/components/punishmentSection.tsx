"use client"

// React
import {useState} from "react";
import {User} from "lucia";
import {SavePunishments} from "@services/user";

// Колонна
import {Punishment} from "@/types/punishment";
import {columns} from "@columns/punishments";

// Компоненты
import {Table} from "@components/table";
import {RatingModal} from "@modals/rating";
import Link from "next/link";

type PunishmentSection = {
    user: User, name?: User["name"]
    access?: boolean
}

export default function PunishmentSection({user, name, access}: PunishmentSection) {
    const [modal, setModal] = useState<boolean>(false)

    return (<>
        <Table<Punishment>
            columns={columns}
            data={user.punishments}
            editable={access}
            setModal={setModal}
            SaveAll={SavePunishments}
            _id={user._id}
            notFound={<Link href="/rules" className="unic_color medium-font">Как повышать звёзды?</Link>}
        >
            <h2>
                Звёзды
            </h2>
        </Table>
        <RatingModal modal={modal} setModal={setModal} user={user} name={name}/>
    </>)
}