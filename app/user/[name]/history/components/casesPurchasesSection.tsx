"use client"

// Стили
import styles from "../history.module.scss"

// Сервер
import {GetAll} from "@services/user";
import {useState} from "react";
import {User} from "lucia";

// Типы
import {Case, Drop} from "@/types/case";
import type {CaseData} from "@/types/purchase";

// Компоненты
import {CasesPurchasesModal} from "@modals/casesPurchases";
import {FormBox, FormButton} from "@components/formBox";
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
          <FormBox action={() => {
              GetAll(user.name, caseDatas)
              setClick(true)
          }}>
            <FormButton disabled={click}>
                {click
                    ? "Проверьте покупки"
                    : "Получить покупки"
                }
            </FormButton>
          </FormBox>
        }

        <p className="center_text">
            <code>/uc menu</code> для использования косметики
        </p>

        <div className={styles.purchases}>
            {caseDatas.map(({rarity, Item, DropItem, Case, Drop}) => {
                if (DropItem.name === "suffix") {
                    return (
                        <Link
                            href={`/shop/drop/${Case.name}/${Drop.name}/${DropItem.name}/${rarity}/${Item.name}`}
                            className="flex_center"
                            style={{width: "280px", height: "160px"}}
                            key={Item.name}
                        >
                            <p className={`border-radius helper ${rarity}_box`}>
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
                        className="flex_center"
                        key={Item.name}
                    >
                        <ImgBox className={`border-radius ${rarity}_box helper`} hover width="280px" height="160px">
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