import dynamic from "next/dynamic";
import {getCaseLocal, getCases, getDropLocal, getDrops, getItems, getUser} from "@/services";
import {validate} from "@services/validate";
import {MultiCaseData} from "@/types/purchase";
import {revalidateTag} from 'next/cache'
import styles from "./history.module.scss";
import {H1} from "@components/h1";
import {NameParams} from "@/types/params";

const InviteSection = dynamic(() => import("./components/inviteSection"));
const PunishmentSection = dynamic(() => import("./components/punishmentSection"));
const CasesPurchasesSection = dynamic(() => import("./components/casesPurchasesSection"));

export const generateMetadata = async ({params}: NameParams) => {
    const {name} = await params

    return {
        title: `${name} > Истории действий`,
        description: `История звёзд и всяких покупок ${name}!`
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

    const caseDatas = [] as MultiCaseData[]

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

                const multiCaseData = caseDatas.find(({Item: caseDataItem}) =>
                    caseDataItem?._id === Item?._id
                )

                if (multiCaseData && multiCaseData.DropItem?.name !== "suffix") {
                    const caseIn = multiCaseData.MultiCase.find(({Case: caseDataCase}) =>
                        caseDataCase?.name === Case?.name
                    )
                    if (!caseIn) {
                        multiCaseData.MultiCase.push({Case, amount: 1})
                    } else {
                        caseIn.amount++
                    }
                } else {
                    caseDatas.push({
                        ...purchase,
                        MultiCase: [{Case, amount: 1}],
                        Drop: Drop,
                        DropItem,
                        Item
                    })
                }

                caseDatas[caseDatas.length - 1].MultiCase.sort(
                    ({Case: Case1}, {Case: Case2}) =>
                        (Case1?.price || 0) - (Case2?.price || 0)
                )
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
            />
        </div>
    )
}