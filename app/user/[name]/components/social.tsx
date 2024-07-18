"use client"

import Link from "next/link";
import {AutoSvg} from "@ui/SVGS";
import {ClickSocial} from "@services/user";
import type {SocialName} from "@/const";

type SocialBox = {
	social: SocialName
	url: string
	clicked?: number
	isMe: boolean
	isModer: boolean
	_id: string
}

export function SocialBox({social, url, clicked, isModer, isMe, _id}: SocialBox) {
	return (
			<Link
					href={url}
					target="_blank"
					onClick={() => ClickSocial(_id, social)}
					title={(isMe || isModer) ? `Кликнули ${clicked || 0}р` : social}
			>
				<AutoSvg size="38px" type={social}/>
			</Link>
	)
}