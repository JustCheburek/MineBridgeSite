// React
import type {PropsWithChildren} from "react";

// Стили
import styles from "./styles/maxSize.module.scss";

type MaxSize = {
	className?: string
	sideNav?: boolean
	width?: number
}

export function MaxSize({children, sideNav=false, className = "", width = 1200}: PropsWithChildren<MaxSize>) {
	if (sideNav && width === 1200) {
		width = 1300
	}

	return (
			<div className={`${styles.max_size} ${sideNav ? styles.sideNav : ""} ${className}`} style={{"--max-width": `${width}px`}}>
				{children}
			</div>
	)
}