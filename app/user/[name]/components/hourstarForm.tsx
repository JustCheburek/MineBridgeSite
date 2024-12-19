"use client";

import {Button} from "@components/button";
import {FormBox} from "@components/formBox";
import {GetStars} from "@services/user";

export function HourStarForm({_id, name}: { _id: string, name: string }) {
    return (
        <FormBox action={() => GetStars(_id, name)}>
            <Button>
                Получить звёзды
            </Button>
        </FormBox>
    )
}