"use client"

// React
import {useState} from "react";
import type {User} from "lucia";
import Link from "next/link";

// Utils
import {ColorText} from "@app/utils";

// Компоненты
import {MostikiSvg} from "@ui/svgs";
import {Add} from "@components/form";
import {MostikiModal} from "@modals/mostikiModal";

export const Mostiki = ({user, access}: { user: User, access: boolean }) => {
	const [modal, setModal] = useState<boolean>(false)

	return (<>
		<h4>
			Мостики: {" "}
			<strong className={ColorText(user.mostiki)}>
				{user.mostiki}
			</strong> {" "}
			<MostikiSvg/>
			{access
					? <Add setModal={setModal}/>
					: <Link href="/shop" className="add">+</Link>
			}
		</h4>
		<MostikiModal modal={modal} setModal={setModal} user={user} access={access}/>
	</>)
}