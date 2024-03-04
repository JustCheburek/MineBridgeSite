// React
import {Helmet} from "react-helmet";
import {Link, Navigate} from "react-router-dom";
import {createColumnHelper} from "@tanstack/react-table";
import TimeAgo from "javascript-time-ago";

// Стили
import "./styles/users.scss"

// Hooks
import {useGetUsers} from "../../hooks/usersQueries";

// Компоненты
import {Table} from "@components/table";
import {Loading} from "@components/loading";
import {colorText} from "@app/utils";
import {MaxSize} from "@components/maxSize";

const columnHelper = createColumnHelper();
const timeAgo = new TimeAgo("");

const Avatar = ({getValue, cell}) => {
	const photo = getValue()
	const {name} = cell.row.original

	return (
			<Link href={`/user/${name}`} className="user_icon_box">
				<img
						src={photo}
						alt="Ава"
						className="user_icon"
						loading="lazy"
				/>
			</Link>
	)
}

const Name = ({getValue}) => {
	const name = getValue()

	return (
			<Link href={`/user/${name}`}>
				{name}
			</Link>
	)
}

const columns = [
	columnHelper.accessor("photo", {
		header: "Ава",
		cell: Avatar
	}),
	columnHelper.accessor("name", {
		header: "Имя",
		cell: Name
	}),
	columnHelper.accessor("rating", {
		header: "Рейтинг",
		meta: {
			className: ({rating}) => `center_text semibold-font ${colorText(rating)}`
		}
	}),
	columnHelper.accessor(user => timeAgo.format(new Date(user.date), "mini"), {
		header: "Дата"
	})
]

export function Component() {
	const {
		isLoading,
		isError,
		data
	} = useGetUsers()

	// Загрузка
	if (isLoading) {
		return (
				<Loading/>
		)
	}

	if (isError) {
		return <Navigate to="/auth"/>
	}

	const {users} = data

	return (
			<main className="users">
				<MaxSize>
					<Helmet>
						<title>Игроки | Майнбридж</title>
						<meta
								charSet="UTF-8"
								content="Братья и сёстры всея Майнбридж!"
								name="description"
						/>
					</Helmet>

					<Table columns={columns} data={users} className="center_text">
						<h1>
							Игроки
						</h1>
					</Table>
				</MaxSize>
			</main>
	)
}