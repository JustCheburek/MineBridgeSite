// React
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";

// Hooks
import {useGetUser, useUpdateUser} from "../../../hooks/userQueries";

// Компоненты
import {Edit, FormButton, FormLabel} from "@components/form";
import {Modal} from "@components/modal";

export function Name() {
	const {name} = useParams()
	const navigate = useNavigate()
	const [modal, setModal] = useState(false)

	const {data: {user, isMe, author}} = useGetUser(name)
	const access = isMe || author?.isModer

	const {
		isLoading,
		mutate
	} = useUpdateUser(name)

	const nameForm = useForm()
	const photoForm = useForm({defaultValues: {photo: user.photo}})

	function ChangeName(data) {
		mutate( {
			updateType: "name", data
		})
		navigate(`/user/${data.name}`)
		setModal(false)
	}

	function ChangePhoto(data) {
		mutate({
			updateType: "photo", data
		})
		setModal(false)
	}

	return (<>
		<h2 className="nickname unic_color center_text">
			<span className="all_select">{user.name}</span> {access && <Edit setModal={setModal}/>}
		</h2>
		<Modal setModal={setModal} modal={modal}>
			<h1>Ник</h1>
			<p>Введите новый майнкрафт никнейм</p>
			<form className="form" onSubmit={nameForm.handleSubmit(ChangeName)}>
				<FormLabel>
					<input
							type="text"
							placeholder="Ник"
							name="name"
							autoComplete="name"
							required
							minLength={4}
							maxLength={20}
							disabled={isLoading}
							{...nameForm.register("name")}
					/>
				</FormLabel>
				<FormButton disabled={isLoading}>
					Сменить
				</FormButton>
			</form>

			<p>Аватарка</p>
			<form className="form" onSubmit={photoForm.handleSubmit(ChangePhoto)}>
				<FormLabel>
          <textarea
		          placeholder="Ссылка на аватарку"
		          autoComplete="href"
		          name="url"
		          required
		          maxLength={200}
		          disabled={isLoading}
		          {...photoForm.register("photo")}
          />
				</FormLabel>
				<FormButton disabled={isLoading}>
					Сменить
				</FormButton>
			</form>
		</Modal>
	</>)
}