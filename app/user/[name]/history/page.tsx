import {getCaseLocal, getCases, getDropLocal, getDrops, getItems, getUser} from "@/services";
import {validate} from "@services/validate";
import {CaseData} from "@/types/purchase";
import {revalidateTag} from "next/cache";
import styles from "./history.module.scss";
import {PunishmentSection} from "./components/ratingSection";
import {CasesPurchasesSection} from "./components/casesPurchasesSection";
import {InviteSection} from "../components/invite";
import {H1} from "@components/h1";
import {NameParams} from "@/types/params";

export const generateMetadata = async ({params}: NameParams) => {
    const {name} = await params

    return {
        title: `${name} > Истории действий`,
        description: `История рейтинга и всяких покупок игрока ${name}!`
    }
}

export default async function History({params}: NameParams) {
    const {name} = await params
    const {user: author, isModer, isAdmin} = await validate()
    const {
        user, isMe
    } = await getUser(
        {name}, true, false, author?._id, isModer
    )
    const [Cases, Drops] = await Promise.all([getCases(), getDrops()])

    const caseDatas = [] as CaseData[]

    for (const purchase of user.casesPurchases) {
        const Case = await getCaseLocal({_id: purchase.Case}, Cases).catch(console.error)
        if (!Case) return console.error("No case")
        const Drop = await getDropLocal({_id: purchase.Drop}, Drops).catch(console.error)
        if (!Drop) return console.error("No drop")
        const DropItem = await getDropLocal({_id: purchase.DropItem}, Drops).catch(console.error)
        if (!DropItem) return console.error("No drop item")

        // Items
        const items = await getItems(DropItem, purchase.rarity).catch(console.error)
        if (!items) return console.error("No items")

        const Item = items.find(({_id}) =>
            JSON.stringify(_id) === JSON.stringify(purchase.Item)
        )

        if (!Item) return console.error("No item")

        caseDatas.push({
            ...purchase,
            Case,
            Drop,
            DropItem,
            Item
        })
    }

    return (
        <div className={styles.content}>
            <H1 up reload={async () => {
                "use server";
                revalidateTag("author")
                revalidateTag("userLike")
            }}>
                История
            </H1>

            <InviteSection user={user} isMe={isMe} isModer={isModer}/>

            <PunishmentSection
                user={user} name={author?.name} access={isModer}
            />

            <CasesPurchasesSection
                access={isAdmin} Cases={Cases} user={user}
                Drops={Drops} isMe={isMe} caseDatas={caseDatas}
            />
        </div>
    )
}