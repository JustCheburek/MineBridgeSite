"use client"

import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import {FormInput, type FormInputProps, FormLabel} from "@components/formBox";

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

type InputNameCheck = {
    name: string
    setName: Dispatch<SetStateAction<string>>
    setAccess?: Dispatch<SetStateAction<boolean>>
    defaultName?: string
}

export const InputNameCheck = (
    {name, setName, setAccess, defaultName, ...props}: InputNameCheck & FormInputProps
) => {
    const [symbol, setSymbol] = useState("")

    useEffect(() => {
        setAccess && setAccess(4 < name.length && name.length < 30)
    })

    return <>
        {4 > name.length &&
          <small>
            Ник <span className="red_color">короткий</span> (мин: <strong className="red_color">4</strong>)
          </small>
        }
        {name.length > 30 &&
          <small>
            Ник <span className="red_color">длинный</span> (макс: <strong className="red_color">30</strong>)
          </small>
        }
        {symbol &&
          <p>
            недопустимый символ:<br/>
            {symbol}
          </p>
        }
        <InputName
            value={name}
            onChange={e => {
                setAccess && setAccess(4 < name.length && name.length < 30)

                if (e.target.value.match(/[^a-zA-Z0-9-_]/)) {
                    setSymbol(JSON.stringify(e.target.value))
                } else {
                    setName(e.target.value)
                    setSymbol("")
                }
            }}
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