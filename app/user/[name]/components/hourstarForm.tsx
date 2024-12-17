"use client";

import {Button} from "@components/button";
import {FormBox} from "@components/formBox";
import {GetStars} from "@services/user";
import {useState} from "react";

export function HourStarForm({_id, name, hours}: { _id: string, name: string, hours: number }) {
    const [click, setClick] = useState(false)

    return (
        <FormBox action={() => {
            GetStars(_id, name, hours)
        }}>
            <Button disabled={click} onClick={() => setClick(true)}>
                Получить звёзды
            </Button>
        </FormBox>
    )
}