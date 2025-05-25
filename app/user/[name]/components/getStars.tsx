"use client";

import {Button} from "@components/button";
import {DefaultFormBox} from "@components/formBox";
import {GetStars} from "@services/user/get";

export function GetStarsForm({_id}: { _id: string }) {
    return (
        <DefaultFormBox action={() => GetStars(_id)}>
            <Button margin="0.8rem">
                Получить звёзды
            </Button>
        </DefaultFormBox>
    )
}