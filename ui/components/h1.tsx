import {ReloadButton} from "@components/reload";
import styles from "./styles/h1.module.scss"
import type {PropsWithChildren} from "react";
import {UpSvg} from "@ui/SVGS";
import Link from "next/link";

interface RelativePath {
	name: string
	displayname: string
}

const RelativeNav = ({paths}: { paths: RelativePath[] }) => (
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
							<span className={styles.nav_arrow}> {">"} </span>
						</span>
				)
			})}
		</nav>
)

type H1Box = {
	reload?: () => void
	up?: boolean
	paths?: RelativePath[]
}

export const H1 = ({children, paths, reload, up = false}: PropsWithChildren<H1Box>) => (
		<div className={styles.container}>
			{paths && <RelativeNav paths={paths}/>}

			<div className={styles.box} id="top">
				{up ?
						<Link href={"#top"} className={`unic_button ${styles.top}`} title="Наверх">
							<UpSvg
									size="4.5rem"
									className="unic_color"
							/>
						</Link>
						: <div/>
				}

				<h1 className={styles.h1}>
					{children}
				</h1>

				{reload && <ReloadButton reload={reload} className={styles.reload}/>}
			</div>
		</div>
)