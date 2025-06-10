"use client";

import {Button} from "@components/button";
import {Form} from "@components/form";
import {GetStars} from "@services/user/get";

export function GetStarsForm({_id}: { _id: string }) {
    return (
        <Form action={() => GetStars(_id)}>
            <Button margin="0.8rem">
                Получить звёзды
            </Button>
        </Form>
    )
}