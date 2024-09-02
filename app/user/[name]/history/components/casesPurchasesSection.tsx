"use client"

// Сервер
import {GetAll} from "@services/user";

// Стили
import styles from "../history.module.scss"

// Компоненты
import {CasesPurchasesModal} from "@modals/casesPurchases";
import {useState} from "react";
import {Case, Drop} from "@/types/case";
import type {CaseData} from "@/types/purchase";
import {Form, FormButton} from "@components/form";
import {User} from "lucia";
import {Img, ImgBox} from "@components/img";
import Link from "next/link";

type CasesPurchasesSection = {
    caseDatas: CaseData[]
    access: boolean
    isMe: boolean
    user: User
    Cases: Case[]
    Drops: Drop[]
}

export function CasesPurchasesSection(
    {
        caseDatas,
        access,
        isMe,
        Cases,
        Drops,
        user
    }: CasesPurchasesSection) {
    const [click, setClick] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(false)

    return (<>
        <h2 className="center_text">
            Покупки кейсов
        </h2>
        {(isMe || access) && caseDatas.length > 0 &&
          <Form action={() => {
              GetAll(user.name, caseDatas)
              setClick(true)
          }}>
            <FormButton disabled={click}>
              Получить покупки
            </FormButton>
          </Form>
        }

        <div className={styles.purchases}>
            {caseDatas.map(({rarity, Item, DropItem, Case, Drop}) => {
                if (DropItem.name === "suffix") {
                    return (
                        <Link
                            href={`/shop/drop/${Case.name}/${Drop.name}/${DropItem.name}/${rarity}/${Item.name}`}
                            className={`flex_center border-radius ${rarity}_box`}
                            style={{width: "280px", height: "160px"}}
                            key={Item.name}
                        >
                            <p>
                                Выберите суффикс<br/>
                                <small>
                                    (в разработке)
                                </small>
                            </p>
                        </Link>
                    )
                }

                return (
                    <Link
                        href={`/shop/drop/${Case.name}/${Drop.name}/${DropItem.name}/${rarity}/${Item.name}`}
                        className={`flex_center border-radius ${rarity}_box ${styles.suffix}`}
                        key={Item.name}
                    >
                        <ImgBox className={`border-radius ${rarity}_box`} hover width="280px" height="160px">
                            <Img src={`/shop/${DropItem.name}/${Item.name}.webp`} alt={Item.displayname}/>
                        </ImgBox>
                    </Link>
                )
            })}
        </div>

        {access &&
            <FormButton onClick={e => {
                e.preventDefault()
                setModal(true)
            }}>
                Добавить
            </FormButton>
        }

        <CasesPurchasesModal
            modal={modal} setModal={setModal} Cases={Cases} Drops={Drops} _id={user._id} access={access}
        />
    </>)
}