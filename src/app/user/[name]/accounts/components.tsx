"use client";

import {Form, FormButton} from "@components/form";
import {Modal} from "@components/modal";
import {useState} from "react";

export function DeleteUser({deleteFnc}: { deleteFnc?: (formData: FormData) => void }) {
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
						Ты уверен, что хочешь удалить свой аккаунт <strong className="red_color">безвозвратно</strong>?
					</p>
					<Form className="form" action={deleteFnc}>
						<FormButton danger>
							Да, удалить!
						</FormButton>
					</Form>
				</Modal>
			</>
	)
}