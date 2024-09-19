import {getCase, getDrop} from "@/services";
import {H1} from "@components/h1";
import {Img, ImgBox} from "@components/img";
import {Case, Drop, Item, RarityNames, type RarityType} from "@/types/case";
import {validate} from "@services/validate";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";
import styles from "./item.module.scss"
import {MostikiSvg} from "@ui/SVGS";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Дроп",
    description: "Какой-то дроп с кейса!",
    openGraph: {
        title: "Дроп",
        description: "Какой-то дроп с кейса!",
    },
    twitter: {
        title: "Дроп",
        description: "Какой-то дроп с кейса!",
    }
};

export default async function ShowCase(
    {
        params: {
            Case: CaseName,
            Drop: DropName,
            DropItem: DropItemName,
            rarity,
            Item: ItemName
        }
    }: {
        params: {
            Case: Case["name"],
            Drop: Drop["name"],
            DropItem: Drop["name"],
            rarity: RarityType,
            Item: Item["name"]
        }
    }) {
    const {user} = await validate(cookies().get(lucia.sessionCookieName)?.value)

    const [Case, Drop, DropItem] = await Promise.all([
        getCase({name: CaseName}),
        getDrop({name: DropName}),
        getDrop({name: DropItemName})
    ])

    // Items
    let {drop: items} = DropItem
    if (items?.length === 0) {
        items = DropItem[rarity]
    }
    if (items?.length === 0 || !items) {
        return (
            <div>
                <H1>
                    Нет Items!
                </H1>
                <p>
                    {JSON.stringify(DropItem)}
                </p>
            </div>
        )
    }

    const Item = items.find(({name}) => name === ItemName)
    if (!Item) return (
        <div>
            <H1>
                Нет Item!
            </H1>
            <p>
                {JSON.stringify(items)}
            </p>
        </div>
    )

    let amount = 0

    if (user) {
        amount = user.casesPurchases.reduce((accum, purchase) => {
            if (purchase.Item === Item._id) {
                accum += 1
            }
            return accum
        }, 0)
    }

    return (
        <div>
            <div className={styles.item}>
                <div>
                    <h3 className="unic_color">
                        {Item?.displayname}
                    </h3>
                    <p className={rarity}>
                        {RarityNames[rarity]}
                    </p>
                    <p>
                        {DropItem?.displayname}
                    </p>
                    <p>
                        У вас есть: {amount} {/*{amount > 0 && <ShareSvg/>}*/}
                    </p>
                </div>
                {DropItem.name !== "suffix"
                    ? <ImgBox className={`border-radius ${rarity}_box`} hover width="280px" height="160px">
                        <Img src={`/shop/${DropItem.name}/${Item.name}.webp`} alt={Item.displayname}/>
                    </ImgBox>
                    : <div
                        className={`flex_center border-radius ${rarity}_box`}
                        style={{width: "280px", height: "160px"}}
                    >
                        <p>
                            Выберите суффикс<br/>
                            <small>
                                (в разработке)
                            </small>
                        </p>
                    </div>
                }
            </div>
            <div className={styles.case}>
                <ImgBox hover overflow={false}>
                    <Img
                        src={`/shop/${Case.name}.png`} alt={`${Case.displayname} кейс`}
                        width={185}
                    />
                </ImgBox>
                <div className="right-text">
                    <p>
                        {Case?.displayname}
                    </p>
                    <p>
                        {Drop?.displayname}
                    </p>
                    <p>
                        {Case?.price + Drop?.price} <MostikiSvg/>
                    </p>
                </div>
            </div>
        </div>
    )
}