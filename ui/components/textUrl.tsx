import type {PropsWithChildren} from "react";
import Link, {type LinkProps} from "next/link";
import styles from "./styles/textUrl.module.scss"
import {DiscordSvg, TelegramSvg, TwitchSvg} from "@ui/svgs";

export function TextUrl({href, children, ...props}: PropsWithChildren<LinkProps>) {
	const type = href?.toString()
			?.split("/")[2]
			?.split(".")[0]

	return (
			<Link href={href} target="_blank" {...props} className={`${styles.url} ${styles[type]}`}>
				<AutoSvg type={type}/>
				{children}
			</Link>
	)
}

function AutoSvg({type}: {type: string}) {
	if (type === "discord") {
		return <DiscordSvg width="1.1em" height="1.1em" className="color"/>
	} else if (type === "t") {
		return <TelegramSvg width="1.1em" height="1.1em" className="color"/>
	} else if (type === "twitch") {
		return <TwitchSvg width="1.1em" height="1.1em" className="color"/>
	}
}