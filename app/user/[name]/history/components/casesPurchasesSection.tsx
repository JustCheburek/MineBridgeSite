"use client"

// Стили
import styles from "../history.module.scss"

// Сервер
import {AddSuffix, DeleteCasePurchase, GetCosmetics, SelectSuffix} from "@services/user";
import {useState} from "react";
import type {User} from "lucia";

// Типы
import {Case, Drop} from "@/types/case";
import type {CaseData, MultiCaseData} from "@/types/purchase";

// Компоненты
import {CasesPurchasesModal} from "@modals/casesPurchases";
import {FormBox, FormButton, FormInput, FormLabel} from "@components/formBox";
import Form from "next/form";
import {Img, ImgBox} from "@components/img";
import Link from "next/link";
import {DeleteSvg} from "@ui/SVGS";
import {CaseBox} from "@components/shop";
import {Url} from "@components/button";

interface Suffix {
    _id: string
    name: string
    isMe: boolean
    suffix: CaseData["suffix"]
    index: number
    selected: boolean
}

function Suffix({_id, name, isMe, suffix, index, selected}: Suffix) {
    if (suffix) {
        return (<>
            <p>
                {suffix}
            </p>

            {selected
                ? <small className={`unic_color ${styles.selected}`}>
                    выбран
                </small>

                : <Form
                    action={() => SelectSuffix(suffix, _id, name)}
                    className={styles.selected}
                >
                    <button>
                        <small>
                            выбрать
                        </small>
                    </button>
                </Form>
            }
        </>)
    }

    if (!isMe) {
        return (
            <p>
                Суффикс
            </p>
        )
    }

    return (
        <FormBox action={(formData: FormData) => AddSuffix(formData, _id, name, index)}>
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
    caseDatas: Partial<MultiCaseData>[]
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

    return (
        <section>
            <div className="center_text">
                <h2>
                    Покупки кейсов
                </h2>
                <p className={styles.description}>
                    <code>/uc menu</code> для использования косметики
                </p>
            </div>

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

            <div className={styles.purchases}>
                {caseDatas.map(
                    ({
                         MultiCase,
                         Drop,
                         DropItem,
                         rarity,
                         Item,
                         suffix
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
                                    name={user.name}
                                    isMe={isMe}
                                    suffix={suffix}
                                    index={index}
                                    selected={user.suffix === suffix}
                                />
                                : <ImgBox hover width="280px" height="160px">
                                    <Img
                                        src={`/shop/${DropItem?.name}/${Item?.name}.webp`}
                                        alt={Item?.displayname || DropItem?.name || ""}
                                    />
                                </ImgBox>
                            }

                            {MultiCase && DropItem?.name !== "suffix" &&
                              <div className={styles.cases}>
                                  {MultiCase.map(({Case, amount}) => Case &&
                                    <Link
                                      href={`/shop/drop/${Case?.name}/${Drop?.name}/${DropItem?.name}/${rarity}/${Item?.name}`}
                                      key={Case?.name}
                                    >
                                      <CaseBox Case={Case} Drops={Drops} size={40} helper={false} isModal={false}>
                                          {amount > 1 &&
                                            <p className={`unic_color medium-font ${styles.case_text}`}>
                                                {amount}
                                            </p>
                                          }
                                      </CaseBox>
                                    </Link>
                                  )}
                              </div>
                            }

                            {access &&
                              <div className={styles.actions}>
                                <Form action={() => {
                                    DeleteCasePurchase(user._id, Item?._id, suffix)
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
              <FormBox action={() => setModal(true)}>
                <FormButton>
                  Добавить
                </FormButton>
              </FormBox>
            }

            <Url href="/shop/case" margin={0} style={{marginTop: "3rem"}}>
                Купить
            </Url>

            {access &&
              <CasesPurchasesModal
                modal={modal} setModal={setModal} Cases={Cases} Drops={Drops} _id={user._id} access={access}
              />
            }
        </section>
    )
}