"use client";

import {FormButton} from "@components/form";
import {Modal} from "@components/modal";
import {useState} from "react";

export function DeleteUser({deleteFnc}: { deleteFnc?: (formData: FormData) => void }) {
	const [modal, setModal] = useState<boolean>(false)

	return (
			<>
				<form className="form" action={() => setModal(true)}>
					<FormButton className="danger">
						Удалить аккаунт
					</FormButton>
				</form>
				<Modal modal={modal} setModal={setModal}>
					<h1>Удаление</h1>
					<p>
						Ты уверен, что хочешь удалить свой аккаунт <strong className="red_color">безвозвратно</strong>?
					</p>
					<form className="form" action={deleteFnc}>
						<FormButton className="danger">
							Да, удалить!
						</FormButton>
					</form>
				</Modal>
			</>
	)
}