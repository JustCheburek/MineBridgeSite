"use client"

import {Form, FormGroup, FormInput, FormLabel} from "@/ui/components/form";
import {type ChangeEvent, useState} from "react";

type InviteLink = {
	name: string
	isContentMaker: boolean
}

export function InviteLink({name, isContentMaker}: InviteLink) {
	const [from, setFrom] = useState("friend")

	const places = ["friend", "youtube", "twitch", "discord", "telegram"]

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFrom(event.target.value)
	}

	return (<>
		{isContentMaker &&
				<Form>
					<FormGroup>
						{places.map(place =>
								<FormLabel key={place}>
									<FormInput
											name="place"
											type="radio"
											value={place}
											onChange={onChange}
											checked={from === place}
									/>
									{place}
								</FormLabel>
						)}
					</FormGroup>
				</Form>
		}
		<p className="all_select unic_color break">
			{process.env.NEXT_PUBLIC_URL}/invite/{name}/{from}
		</p>
	</>)
}