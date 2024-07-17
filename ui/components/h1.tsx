import {ReloadButton} from "@components/clientButtons";
import styles from "./styles/h1.module.scss"
import type {PropsWithChildren} from "react";
import {UpSvg} from "@ui/SVGS";
import Link from "next/link";

type H1Box = {
	reload?: Function
}

export const H1 = ({children, reload}: PropsWithChildren<H1Box>) => (
		<div className={styles.h1_box} id="top">
			<Link href={"#top"}>
				<UpSvg
						width="4rem"
						height="4rem"
						className="unic_color"
				/>
			</Link>

			<h1 className={styles.h1}>
				{children}
			</h1>

			{reload && <ReloadButton reload={reload}/>}
		</div>
)