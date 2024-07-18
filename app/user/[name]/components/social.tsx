"use client"

import Link from "next/link";
import {AutoSvg} from "@ui/SVGS";

type SocialBox = {
	social: string
	url: string
	clicked?: number
	updateCount: Function
	isMe: boolean
	isModer: boolean
}

export function SocialBox({social, url, clicked, isModer, updateCount, isMe}: SocialBox) {
	return (
			<Link
					href={url}
					target="_blank"
					onClick={() => updateCount(social)}
					title={(isMe || isModer) ? `Кликнули ${clicked || 0}р` : social}
			>
				<AutoSvg size="38px" type={social}/>
			</Link>
	)
}