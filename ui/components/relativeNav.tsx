// React
import Link from "next/link";

// Стили
import styles from "./styles/relativeNav.module.scss"

type Nav = {
	name: string
	displayname: string
}

export const RelativeNav = ({paths}: { paths: Nav[] }) => (
		<nav className="center_text">
			{paths.map((path, index) => {
				const current = index + 1
				const last = current === paths.length

				if (last) {
					return <span key={path.name}>{path.displayname}</span>
				}

				const absolutePath = `/${paths.slice(0, current).map(p => p.name).join("/")}`

				return (
						<span key={path.name}>
							<Link href={absolutePath} key={path.name}>{path.displayname}</Link>
							<span className={styles.relative_nav_arrow}> {">"} </span>
						</span>
				)
			})}
		</nav>
)