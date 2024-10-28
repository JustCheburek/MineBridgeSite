"use client";

import {Form, FormButton, FormInput, FormLabel, FormTextarea} from "@components/form";
import {Season} from "@/types/season";

export function AddNewForm({addNew, number}: { addNew: Function, number: Season["number"] }) {
    return (
        <Form action={formData => addNew(formData, number)}>
            <FormLabel>
                <FormInput
                    name="heading"
                    placeholder="Название"
                    required
                />
            </FormLabel>

            <FormLabel>
                <FormTextarea
                    name="image"
                    placeholder="Ссылка на картинку"
                />
            </FormLabel>

            <FormLabel>
                <FormTextarea
                    name="href"
                    placeholder="Ссылка на названии и картинке"
                />
            </FormLabel>

            <FormLabel>
                <FormTextarea
                    name="text"
                    placeholder="Текст с markdown"
                    required
                />
            </FormLabel>

            <FormLabel>
                <FormInput
                    type="date"
                    name="startAt"
                    placeholder="Начало"
                />
            </FormLabel>

            <FormLabel>
                <FormInput
                    type="date"
                    name="endAt"
                    placeholder="Конец"
                />
            </FormLabel>

            <FormButton>
                Добавить
            </FormButton>
        </Form>
    )
}