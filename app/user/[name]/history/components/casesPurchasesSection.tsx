"use client"

// Сервер
import {GetAll, SaveCasesPurchases} from "@services/user";

// Колонны
import {columns} from "@columns/casesPurchases";

// Компоненты
import {Table} from "@components/table";
import Link from "next/link";
import {CasesPurchasesModal} from "@modals/casesPurchases";
import {useState} from "react";
import {Case, Drop} from "@/types/case";
import type {CaseData} from "@/types/purchase";
import {Form, FormButton} from "@components/form";
import {User} from "lucia";

type CasesPurchasesSection = {
    caseDatas: CaseData[]
    access?: boolean
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
        <Table
            columns={columns}
            data={caseDatas}
            editable={access}
            _id={user._id}
            SaveAll={SaveCasesPurchases}
            setModal={setModal}
            notFound={<Link href="/shop" className="unic_color medium-font">Как покупать?</Link>}
        >
            <h2>
                Покупки кейсов
            </h2>
            {isMe && caseDatas.length > 0 &&
              <Form action={() => {
                  GetAll(user.name, caseDatas)
                  setClick(true)
              }}>
                <FormButton disabled={click}>
                  Получить покупки
                </FormButton>
              </Form>
            }
        </Table>
        <CasesPurchasesModal
            modal={modal} setModal={setModal} Cases={Cases} Drops={Drops} _id={user._id}
        />
    </>)
}