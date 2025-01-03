"use client"

// Стили
import styles from "../history.module.scss"

// Сервер
import {AddSuffix, GetCosmetics, RemoveCasePurchase, SelectSuffix} from "@services/user";
import {useState} from "react";
import {User} from "lucia";

// Типы
import {Case, Drop} from "@/types/case";
import type {CaseData} from "@/types/purchase";

// Компоненты
import {CasesPurchasesModal} from "@modals/casesPurchases";
import {FormBox, FormButton, FormInput, FormLabel, FormLink} from "@components/formBox";
import Form from "next/form";
import {Img, ImgBox} from "@components/img";
import Link from "next/link";
import {DeleteSvg} from "@ui/SVGS";

interface Suffix {
    _id: string
    isMe: boolean
    suffix: CaseData["suffix"]
    index: number
    selected: boolean
}

function Suffix({_id, isMe, suffix, index, selected}: Suffix) {
    if (suffix) {
        return (<>
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
        </>)
    }

    if (!isMe) return

    return (
        <FormBox action={(formData: FormData) => AddSuffix(formData, _id, index)}>
            <FormLabel>
                <FormInput
                    name="name"
                    placeholder="Суффикс (не меняется)"
                    maxLength={15}
                    required
                />
            </FormLabel>
            <FormButton>
                Сохранить
            </FormButton>
        </FormBox>
    )
}

type CasesPurchasesSection = {
    caseDatas: Partial<CaseData>[]
    access: boolean
    isMe: boolean
    user: User
    Cases: Case[]
    Drops: Drop[]
}

export default function CasesPurchasesSection(
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
          <FormBox action={() => GetCosmetics(user.name, caseDatas)}>
            <FormButton disabled={click} onClick={() => setClick(true)}>
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
            {caseDatas.map(
                ({
                     Case,
                     Drop,
                     DropItem,
                     rarity,
                     Item,
                     suffix,
                    _id
                 },
                 index
                ) =>
                    <div
                        style={{width: "280px", height: "160px"}}
                        className={`border-radius grid_center ${styles.item} ${rarity}_box`}
                        key={index}
                    >
                        {DropItem?.name === "suffix"
                            ? <Suffix
                                _id={user._id}
                                isMe={isMe}
                                suffix={suffix}
                                index={index}
                                selected={user.suffix === suffix}
                            />
                            :
                            <ImgBox hover width="280px" height="160px">
                                <Img src={`/shop/${DropItem?.name}/${Item?.name}.webp`} alt={Item?.displayname || ""}/>
                            </ImgBox>
                        }

                        <Link
                            href={`/shop/drop/${Case?.name}/${Drop?.name}/${DropItem?.name}/${rarity}/${Item?.name}`}
                            className={`helper ${styles.helper}`}
                        >
                            ?
                        </Link>

                        {access &&
                          <div className={styles.actions}>
                              {/*<Form action={() => EditCosmetic()}>
                              <button className="helper_box">
                                <EditSvg size="1.3rem"/>
                              </button>
                            </Form>*/}

                            <Form action={() => {
                                _id ? RemoveCasePurchase(user._id, _id)
                                    : console.error("Нет _id")
                            }}>
                              <button className="helper_box danger">
                                <DeleteSvg size="1.3rem"/>
                              </button>
                            </Form>
                          </div>
                        }
                    </div>
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

        {access &&
          <CasesPurchasesModal
            modal={modal} setModal={setModal} Cases={Cases} Drops={Drops} _id={user._id} access={access}
          />
        }
    </>)
}