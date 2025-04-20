"use client"

import {type Dispatch, type SetStateAction, useState} from "react";
import {FormInput, type FormInputProps, FormLabel} from "@components/formBox";

const InputName = ({autoComplete = "name", ...props}: FormInputProps) => (
    <FormLabel>
        <FormInput
            placeholder="Майнкрафт никнейм"
            name="name"
            autoComplete={autoComplete}
            required
            maxLength={30}
            {...props}
        />
    </FormLabel>
)

type InputNameCheck = {
    name: string
    setName: Dispatch<SetStateAction<string>>
    setAccess?: Dispatch<SetStateAction<boolean>>
}

export const InputNameCheck = (
    {name, setName, ...props}: InputNameCheck & FormInputProps
) => {
    const [symbol, setSymbol] = useState("")

    return <>
        {name.length > 30 &&
          <small>
            Ник <span className="red_color">длинный</span> (макс: <strong className="red_color">30</strong>)
          </small>
        }
        {symbol &&
          <p>
              <strong className="unic_color">{symbol}</strong> <small>— недопустимый символ</small>
          </p>
        }
        <InputName
            value={name}
            onChange={e => {
                if (e.target.value.match(/[^a-zA-Z0-9-_]/)) {
                    setSymbol(String(e.target.value))
                } else {
                    setName(e.target.value)
                    setSymbol("")
                }
            }}
            title="Ник"
            {...props}
        />
    </>
}

export const InputNameCheckWithoutState = ({defaultName = "", ...props}: {
    defaultName?: string, setAccess?: Dispatch<SetStateAction<boolean>>
} & FormInputProps) => {
    const [name, setName] = useState(defaultName)
    return <InputNameCheck name={name} setName={setName} {...props}/>
}