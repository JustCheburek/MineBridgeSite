"use client"

import {SVGS, SVGS_NAME} from "@ui/SVGS";
import Link from "next/link";

type SocialBox = {
	social: SVGS_NAME
	url: string
	clicked?: number
	updateCount: Function
	isMe: boolean
}

export function SocialBox({social, url, clicked, updateCount, isMe}: SocialBox) {
	return (
			<Link
					href={url}
					target="_blank"
					onClick={() => updateCount(social)}
					title={isMe ? `Кликнули ${clicked || 0}р` : social}
			>
				{SVGS[social]}
			</Link>
	)
}