"use client"

import {useState} from "react";
import {FormInput, type FormInputProps, FormLabel} from "@components/form";

export const InputName = ({autoComplete = "name", ...props}: FormInputProps) => (
		<FormLabel>
			<FormInput
					placeholder="Майнкрафт никнейм"
					name="name"
					autoComplete={autoComplete}
					required
					minLength={4}
					maxLength={30}
					{...props}
			/>
		</FormLabel>
)

export const InputNameCheck = ({nameInput, setNameInput, ...props}: {
	nameInput: string,
	setNameInput: (name: string) => void
} & FormInputProps) => {
	const [symbol, setSymbol] = useState("")

	return <>
		{symbol &&
				<p>
					недопустимый символ:<br/>
					{symbol}
				</p>
		}
		<InputName
				value={nameInput}
				onChange={e => {
					if (e.target.value.match(/[^a-zA-Z0-9-]/)) {
						setSymbol(JSON.stringify(e.target.value))
					} else {
						setNameInput(e.target.value)
						setSymbol("")
					}
				}}
				{...props}
		/>
	</>
}

export const InputNameCheckWithoutNameInput = ({defaultName = "", ...props}: {
	defaultName?: string
} & FormInputProps) => {
	const [nameInput, setNameInput] = useState(defaultName)
	return <InputNameCheck nameInput={nameInput} setNameInput={setNameInput} {...props}/>
}