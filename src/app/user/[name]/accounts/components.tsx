"use client";

import {Form, FormButton, FormInput, FormLabel} from "@components/form";
import {Modal} from "@components/modal";
import {useState} from "react";
import type {User} from "@src/types/user";

export function DeleteUser({name, deleteFnc}: { name: User["name"], deleteFnc?: (formData: FormData) => void }) {
	const [modal, setModal] = useState<boolean>(false)

	return (
			<>
				<Form className="form" action={() => setModal(true)}>
					<FormButton danger>
						Удалить аккаунт
					</FormButton>
				</Form>
				<Modal modal={modal} setModal={setModal}>
					<h1>Удаление</h1>
					<p>
						Ты уверен, что хочешь
					</p>
					<p>
						удалить свой аккаунт <strong className="red_color">безвозвратно</strong>?
					</p>
					<h4>Тогда введи свой <strong className="red_color">ник</strong></h4>
					<Form className="form" action={deleteFnc}>
						<FormLabel>
							<FormInput danger placeholder={name}/>
						</FormLabel>
						<FormButton danger>
							Жми, жми!
						</FormButton>
					</Form>
				</Modal>
			</>
	)
}