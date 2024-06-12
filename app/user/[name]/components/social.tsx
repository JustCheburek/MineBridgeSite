"use client"

import {SVGS, SVGS_NAME} from "@ui/SVGS";
import Link from "next/link";

type SocialBox = {
	social: SVGS_NAME
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
				{SVGS[social]}
			</Link>
	)
}