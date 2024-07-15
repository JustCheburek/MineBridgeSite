"use client"

import {Form, FormGroup, FormInput, FormLabel} from "@/ui/components/form";
import {type ChangeEvent, useState} from "react";

type InviteLink = {
	name: string
}

export function InviteLink({name}: InviteLink) {
	const [from, setFrom] = useState("friend")

	const places = {
		"friend": "Друг",
		"youtube": "Ютуб",
		"twitch": "Твич",
		"discord": "Дискорд",
		"telegram": "Телеграм",
	}

	const placesList = Object.keys(places) as (keyof typeof places)[]

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFrom(event.target.value)
	}

	return (<>
		<Form>
			<FormGroup>
				{placesList.map(place =>
						<FormLabel key={place}>
							<FormInput
									name="place"
									type="radio"
									value={place}
									onChange={onChange}
									checked={from === place}
							/>
							{places[place]}
						</FormLabel>
				)}
			</FormGroup>
		</Form>
		<p className="all_select unic_color break">
			{process.env.NEXT_PUBLIC_URL}/invite/{name}/{from}
		</p>
	</>)
}