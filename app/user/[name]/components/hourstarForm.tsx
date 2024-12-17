"use client";

import {Button} from "@components/button";
import {FormBox} from "@components/formBox";
import {GetStars} from "@services/user";

export function HourStarForm({_id, name, hours}: { _id: string, name: string, hours: number }) {
    return (
        <FormBox action={() => {
            GetStars(_id, name, hours)
        }}>
            <Button>
                Получить звёзды
            </Button>
        </FormBox>
    )
}