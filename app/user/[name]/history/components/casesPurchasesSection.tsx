"use client"

// Сервер
import type {User} from "lucia";

// Колонны
import {columns} from "@columns/casesPurchases";

// Компоненты
import {Table} from "@components/table";
import Link from "next/link";
import {CasesPurchasesModal} from "@modals/casesPurchasesModal";
import {useState} from "react";
import {Case, Drop} from "@/types/case";
import type {CaseData} from "@/types/purchase";

type CasesPurchasesSection = {
    user: User
    access?: boolean
    Cases: Case[]
    Drops: Drop[]
    SaveAll: Function
    casePurchaseFunc: Function
}

export function CasesPurchasesSection({user, access, Cases, Drops, SaveAll, casePurchaseFunc}: CasesPurchasesSection) {
    const [modal, setModal] = useState<boolean>(false)

    const data = [] as CaseData[]

    user.casesPurchases.forEach(purchase => {
        const Case = Cases.find(({_id}) => JSON.stringify(_id) === JSON.stringify(purchase.Case))
        const Drop = Drops.find(({_id}) => JSON.stringify(_id) === JSON.stringify(purchase.Drop))
        const DropItem = Drops.find(({_id}) => JSON.stringify(_id) === JSON.stringify(purchase.DropItem))
        if (!Case || !Drop || !DropItem) return console.log("No case or drop")

        // Items
        let {drop: items} = DropItem
        if (items?.length === 0) {
            items = DropItem[purchase.rarity!]
        }
        if (items?.length === 0 || !items) return console.log("No items")

        const Item = items.find(({_id}) =>
            JSON.stringify(_id) === JSON.stringify(purchase.Item)
        )

        if (!Item) return console.log("No item")

        data.push({
            ...purchase,
            Case,
            Drop,
            DropItem,
            Item
        })
    })

    return (<>
        <Table
            columns={columns}
            data={data}
            editable={access}
            SaveAll={SaveAll}
            setModal={setModal}
            notFound={<Link href="/shop" className="unic_color medium-font">Как покупать?</Link>}
        >
            <h2>
                Покупки кейсов
            </h2>
        </Table>
        <CasesPurchasesModal modal={modal} setModal={setModal} Cases={Cases} Drops={Drops} casePurchaseFunc={casePurchaseFunc}/>
    </>)
}