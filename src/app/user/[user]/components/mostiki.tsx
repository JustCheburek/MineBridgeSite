// React
import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";

// Utils
import {colorText} from "@app/utils";

// Hooks
import {useGetUser, useUpdateUserMostiki} from "../../../hooks/userQueries";

// Компоненты
import {Add, FormButton, FormLabel} from "@components/form";
import {Modal} from "@components/modal";
import {MostikiSvg} from "@ui/svgs";

export function Mostiki() {
	const {name} = useParams()
	const [mostikiModal, setMostikiModal] = useState(false)

	const {
		data: {user, author}
	} = useGetUser(name)
	const {
		mutate, isLoading
	} = useUpdateUserMostiki(name)

	const {
		register,
		handleSubmit
	} = useForm()

	async function changeMostiki(data) {
		mutate(data)
		setMostikiModal(false)
	}

	return (<>
		<h4 className="user_info">
			Мостики: {" "}
			<strong className={colorText(user.mostiki)}>
				{user.mostiki}
			</strong> {" "}
			<MostikiSvg/> {" "}
			{author.isAdmin
					? <Add setModal={setMostikiModal}/>
					: <Link href="/shop" className="add">+</Link>
			}
		</h4>

		{author.isAdmin &&
				<Modal setModal={setMostikiModal} modal={mostikiModal}>
					<h1>Мостики</h1>
					<p>Значение суммируется</p>
					<form
							className="form"
							onSubmit={handleSubmit(changeMostiki)}
					>
						<FormLabel>
							<input
									type="number"
									placeholder="Мостики"
									autoComplete="mostiki"
									required
									disabled={isLoading}
									{...register("mostiki", {valueAsNumber: true})}
							/>
						</FormLabel>

						<FormButton disabled={isLoading}>
							Добавить
						</FormButton>
					</form>
				</Modal>
		}
	</>)
}