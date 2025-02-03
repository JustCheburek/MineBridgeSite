"use client";

import {FormBox, FormButton, FormInput, FormLabel, FormTextarea} from "@components/formBox";
import {Season} from "@/types/season";
import {ImgUpload} from "@components/imgUpload";
import {useEdgeStore} from "@/lib/edgestore";
import {useState} from "react";
import type {ChangeEvent} from "react";

export function AddNewForm({addNew, number}: { addNew: Function, number: Season["number"] }) {
    const {edgestore} = useEdgeStore()
    const [file, setFile] = useState<File>()
    const [photo, setPhoto] = useState<string>()
    return (
        <FormBox action={async (formData) => {
            if (photo) {
                await edgestore.publicFiles.confirmUpload({
                    url: photo,
                });
            }

            addNew(formData, number)
        }}>
            <FormLabel>
                <FormInput
                    name="heading"
                    placeholder="Название"
                    required
                />
            </FormLabel>

            <ImgUpload
                value={file}
                onChange={async (file) => {
                    setFile(file)
                    if (file) {
                        const {url} = await edgestore.publicFiles.upload({
                            file,
                            input: {type: "news"},
                            options: {
                                replaceTargetUrl: photo,
                                temporary: true
                            }
                        })
                        setPhoto(url)
                    }
                }}
            />

            <FormLabel>
                <FormTextarea
                    name="image"
                    placeholder="Ссылка на картинку"
                    value={photo}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setPhoto(e.target.value)
                    }
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
        </FormBox>
    )
}