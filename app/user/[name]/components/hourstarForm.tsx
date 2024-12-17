"use client";

import {Button} from "@components/button";
import {FormBox} from "@components/formBox";
import {GetStars} from "@services/user";
import {useState} from "react";

export function HourStarForm({_id, name}: { _id: string, name: string }) {
    const [click, setClick] = useState(false)

    return (
        <FormBox action={() => {
            setClick(true)
            GetStars(_id, name)
        }}>
            <Button disabled={click}>
                Получить звёзды
            </Button>
        </FormBox>
    )
}