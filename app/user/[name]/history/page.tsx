import {getCaseLocal, getCases, getDropLocal, getDrops, getItems, getUser} from "@/services";
import {validate} from "@services/validate";
import {CaseData} from "@/types/purchase";
import {revalidateTag} from 'next/cache'
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
        description: `История звёзд и всяких покупок игрока ${name}!`
    }
}

export default async function History({params}: NameParams) {
    const {name} = await params
    const {user: author, isHelper, isAdmin} = await validate()
    const {
        user, isMe
    } = await getUser(
        {name}, true, false, author?._id, isHelper
    )
    const [Cases, Drops] = await Promise.all([getCases(), getDrops()])

    const caseDatas = [] as Partial<CaseData>[]

    if (user.casesPurchases) {
        for (const purchase of user.casesPurchases) {
            try {
                const Case = await getCaseLocal({_id: purchase.Case}, Cases)
                const Drop = await getDropLocal({_id: purchase.Drop}, Drops)
                const DropItem = await getDropLocal({_id: purchase.DropItem}, Drops)

                // Items
                const items = await getItems(DropItem, purchase.rarity)

                const Item = items.find(({_id}) =>
                    JSON.stringify(_id) === JSON.stringify(purchase.Item)
                )

                caseDatas.push({
                    ...purchase,
                    Case,
                    Drop,
                    DropItem,
                    Item
                })
            } catch (e) {
                console.error(e)
            }
        }
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

            <InviteSection user={user} isMe={isMe} isHelper={isHelper}/>

            <PunishmentSection
                user={user} name={author?.name} access={isHelper}
            />

            <CasesPurchasesSection
                access={isAdmin} Cases={Cases} user={user}
                Drops={Drops} isMe={isMe} caseDatas={caseDatas}
                _id={user._id}
            />
        </div>
    )
}