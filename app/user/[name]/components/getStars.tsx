"use client";

import {Button} from "@components/button";
import {DefaultFormBox} from "@components/formBox";
import {GetStars} from "@services/user";

export function GetStarsForm({_id}: { _id: string }) {
    return (
        <DefaultFormBox action={() => GetStars(_id)}>
            <Button>
                Получить звёзды
            </Button>
        </DefaultFormBox>
    )
}