"use client"

// Стили
import styles from "../history.module.scss"

// Сервер
import {AddSuffix, GetCosmetics, SelectSuffix} from "@services/user";
import {useState} from "react";
import {User} from "lucia";

// Типы
import {Case, Drop} from "@/types/case";
import type {CaseData} from "@/types/purchase";

// Компоненты
import {CasesPurchasesModal} from "@modals/casesPurchases";
import {FormBox, FormButton, FormInput, FormLabel, FormLink} from "@components/formBox";
import {Img, ImgBox} from "@components/img";
import Form from "next/form";

interface ItemBox {
    _id: string
    isMe: boolean
    caseData: CaseData
    index: number
    selected: boolean
}

function ItemBox({_id, isMe, caseData, index, selected}: ItemBox) {
    const {DropItem, rarity, Item, suffix} = caseData

    if (DropItem.name === "suffix") {
        if (suffix) {
            return (
                <div
                    className={`border-radius grid_center ${rarity}_box ${styles.item}`}
                    style={{width: "280px", height: "160px"}}
                >
                    <p>
                        {suffix}
                    </p>

                    {selected
                        ? <small className={`unic_color ${styles.selected}`}>
                            выбран
                        </small>

                        : <Form action={() => SelectSuffix(suffix, _id)} className={styles.selected}>
                            <button>
                                <small>
                                    выбрать
                                </small>
                            </button>
                        </Form>
                    }
                </div>
            )
        }

        if (!isMe) return

        return (
            <Form
                action={(formData: FormData) => AddSuffix(formData, _id, index)}
                className={`border-radius grid_center ${styles.item} ${rarity}_box ${styles.suffix}`}
                style={{width: "280px", height: "160px"}}
            >
                <FormLabel>
                    <FormInput
                        name="name"
                        placeholder="Введите суффикс"
                        maxLength={12}
                        required
                    />
                </FormLabel>
                <FormButton>
                    Сохранить
                </FormButton>
            </Form>
        )
    }

    return (
        <ImgBox className={`border-radius ${rarity}_box helper`} hover width="280px" height="160px">
            <Img src={`/shop/${DropItem.name}/${Item.name}.webp`} alt={Item.displayname}/>
        </ImgBox>
    )
}

type CasesPurchasesSection = {
    caseDatas: CaseData[]
    access: boolean
    isMe: boolean
    user: User
    Cases: Case[]
    Drops: Drop[]
    _id: string
}

export function CasesPurchasesSection(
    {
        caseDatas,
        access,
        isMe,
        Cases,
        Drops,
        user,
        _id
    }: CasesPurchasesSection) {
    const [click, setClick] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(false)

    return (<>
        <h2 className="center_text">
            Покупки кейсов
        </h2>
        {(isMe || access) && caseDatas.length > 0 &&
          <FormBox action={() => {
              GetCosmetics(user.name, caseDatas)
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
            {caseDatas.map((caseData, index) => (
                    <div
                        className="flex_center"
                        key={index}
                    >
                        <ItemBox
                            _id={_id}
                            isMe={isMe}
                            caseData={caseData}
                            index={index}
                            selected={user.suffix === caseData.suffix}
                        />
                    </div>
                )
            )}
        </div>

        {access &&
          <FormButton onClick={e => {
              e.preventDefault()
              setModal(true)
          }}>
            Добавить
          </FormButton>
        }

        <FormLink href="/shop/case">
            Купить
        </FormLink>

        <CasesPurchasesModal
            modal={modal} setModal={setModal} Cases={Cases} Drops={Drops} _id={user._id} access={access}
        />
    </>)
}