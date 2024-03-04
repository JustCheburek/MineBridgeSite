// React
import {useState} from "react";
import {useParams} from "react-router-dom";

// Hooks
import {useGetUser, useUpdateUser} from "../../../hooks/userQueries";

// Компоненты
import {Button} from "@components/button";
import {Modal} from "@components/modal";
import {Edit, FormButton} from "@components/form";
import {useForm} from "react-hook-form";

function WhitelistModal({modal, setModal}) {
	const {name} = useParams()

	const {
		data: {user}
	} = useGetUser(name)
	const {
		mutate, isLoading, isError
	} = useUpdateUser(name)

	const {
		handleSubmit
	} = useForm()

	function addToWhitelist() {
		mutate({
			updateType: "whitelist"
		})
		setModal(false)
	}

	return (
			<Modal setModal={setModal} modal={modal}>
				<h1>Whitelist</h1>
				<p>
					<span className="red_color">Внимание!</span><br/>
					Ваш майнкрафт никнейм - {" "}
					<strong className="unic_color all_select">{user.name}</strong>?
				</p>
				<p>
					Если <span className="red_color">нет</span>, тогда вы можете изменить<br/>
					его по кнопке <Edit/> около своего ника!
				</p>
				<form className="form" onSubmit={handleSubmit(addToWhitelist)}>
					<FormButton disabled={isLoading}>
						{isError
								? "Ошибка"
								: "Подать заявку"
						}
					</FormButton>
				</form>
			</Modal>
	)
}

export function WhitelistSection() {
	const {name} = useParams()
	const [modal, setModal] = useState(false)

	const {
		data: {user, author, isMe}
	} = useGetUser(name)
	const access = isMe || author.isModer

	if (!access) {
		const whitelistState = {
			true: "Этот игрок в Whitelist`е!",
			false: "Этот игрок не в Whitelist`е!"
		}

		return (
				<section className="whitelist center_text">
					<h2>
						{whitelistState[user.whitelist]}
					</h2>
				</section>
		)
	}

	if (user.whitelist) {
		return (
				<>
					<section className="whitelist center_text">
						<h2>Вы в Whitelist`е</h2>
						<p>Айпи сервера - <strong className="unic_color all_select">map.minebridge.site</strong></p>
						<Button onClick={() => setModal(true)}>
							Заново
						</Button>
					</section>
					<WhitelistModal modal={modal} setModal={setModal}/>
				</>
		)
	}

	return (
			<>
				<div className="whitelist center_text">
					<h2>Хотите поиграть на сервере?</h2>
					<Button onClick={() => setModal(true)}>
						Попасть в Whitelist
					</Button>
				</div>
				<WhitelistModal modal={modal} setModal={setModal}/>
			</>
	)
}