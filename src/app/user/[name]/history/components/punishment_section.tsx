// React
import {User} from "lucia";
import TimeAgo from "javascript-time-ago";

// Utils
import {ColorText} from "@app/utils";

// Компоненты
import {Table} from "@components/table";
import {createColumnHelper} from "@tanstack/react-table";

const timeAgo = new TimeAgo('ru-RU')
const columnHelper = createColumnHelper();

const columns = [
	columnHelper.accessor("reason", {
		header: "Причина"
	}),
	columnHelper.accessor("rating", {
		header: "Рейтинг",
		meta: {
			className: ({rating}) => `center_text semibold-font ${ColorText(rating)}`
		}
	}),
	columnHelper.accessor("author", {
		header: "Автор",
    meta: {
      className: "center_text"
    }
	}),
	columnHelper.accessor(data => timeAgo.format(new Date(data.date), "mini"), {
		header: "Время",
		meta: {
			className: "center_text"
		}
	})
]

export function PunishmentSection({user}: { user: User }) {
	return (
			<Table columns={columns} data={user.punishments}>
				<h2>
					Рейтинг
				</h2>
			</Table>
	)
}

/*
function Punishment({punishment}) {
	const {name} = useParams()
	const [ratingModal, setRatingModal] = useState(false)

	const {
		data: {author}
	} = useGetUser(name)

	const {
		isLoading, mutate
	} = useUpdateUserPunishment(name)
	const deleteUserPunishment = useDeleteUserPunishment(name)

	const {
		register,
		handleSubmit
	} = useForm({
		defaultValues: {...punishment, date: new Date(punishment.date).toISOString().substring(0, 10)}
	})
	const deletePunishment = useForm({
		defaultValues: {
			"punishmentId": punishment._id
		}
	})

	const changeRating = (punishment) => {
		mutate(punishment)
		setRatingModal(false)
	}

	const deleteRating = (punishment) => {
		deleteUserPunishment.mutate(punishment)
		setRatingModal(false)
	}

	return (
			<li>
				<p>
					{punishment.reason}
				</p>
				<p className={ColorText(punishment.rating)}>
					<strong>
						{punishment.rating}
					</strong>
				</p>
				<p className="for_pc">
					{punishment.author}
				</p>
				<p className="for_pc">
					{timeAgo.format(new Date(punishment.date))}
				</p>
				{author.isModer && <>
					<Edit setModal={setRatingModal}/>

					<Modal modal={ratingModal} setModal={setRatingModal}>
						<h1>Рейтинг</h1>
						<form
								className="form"
								onSubmit={handleSubmit(changeRating)}
						>
							<FormLabel>
								<input
										type="text"
										placeholder="Причина"
										autoComplete="reason"
										required
										maxLength={26}
										disabled={isLoading}
										{...register("reason")}
								/>
							</FormLabel>
							<FormLabel>
								<input
										type="number"
										placeholder="Рейтинг"
										autoComplete="rating"
										required
										disabled={isLoading}
										{...register("rating", {valueAsNumber: true})}
								/>
							</FormLabel>
							<FormLabel>
								<input
										type="text"
										placeholder="Автор"
										autoComplete="author"
										required
										disabled={isLoading}
										{...register("author")}
								/>
							</FormLabel>
							<FormLabel>
								<input
										type="date"
										placeholder="Время"
										autoComplete="date"
										required
										disabled={isLoading}
										{...register("date", {valueAsDate: true})}
								/>
							</FormLabel>
							<FormButton disabled={isLoading}>
								Изменить
							</FormButton>
						</form>
						<form
								className="form"
								onSubmit={deletePunishment.handleSubmit(deleteRating)}
						>
							<FormButton className="danger" disabled={deleteUserPunishment.isLoading}>
								Удалить
							</FormButton>
						</form>
					</Modal>
				</>
				}
			</li>
	)
}*/
