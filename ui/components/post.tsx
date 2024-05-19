// React
import type {PropsWithChildren} from "react";

// Стили
import styles from "./styles/post.module.scss";

type PTitle = {
	className?: string
	startAt?: Date
	endAt?: Date
}

export const PBox = (
		{
			children,
			className = ""
		}: PropsWithChildren<{ className?: string }>
) => (
		<div
				className={`${styles.container} ${className}`}
		>
			{children}
		</div>
)

export const PTitle = (
		{
			children, className = "", startAt, endAt
		}: PropsWithChildren<PTitle>) => (
		<div className={`${styles.title} ${className}`}>
			{children}
			{startAt &&
					<div className={styles.time}>
						<small className="medium-font">
							{new Date(startAt).toLocaleDateString()}
						</small>
						{endAt &&
								<>
									{"-"} <small className="medium-font">{new Date(endAt).toLocaleDateString()}</small>
								</>
						}
					</div>
			}
		</div>
)

export const PText = (
		{
			children, className = ""
		}: PropsWithChildren<{
			className?: string
		}>) => (
		<div className={`${styles.text} ${className}`}>
			{children}
		</div>
)