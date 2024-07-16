// React
import type {ComponentPropsWithoutRef, PropsWithChildren} from "react";

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
			className = "",
			...props
		}: PropsWithChildren<{ className?: string } & ComponentPropsWithoutRef<"div">>
) => (
		<div className={`${styles.container} ${className}`} {...props}>
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
							{new Date(startAt).toLocaleDateString("ru-RU", {
								timeZone: "Asia/Vladivostok"
							})}
						</small>
						{endAt &&
								<>
									{"-"} <small className="medium-font">
									{new Date(endAt).toLocaleDateString("ru-RU", {
										timeZone: "Asia/Vladivostok"
									})}
								</small>
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