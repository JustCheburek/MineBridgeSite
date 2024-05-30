// Сервер
import {getUser} from "@/services";
import {validate} from "@services/validate";
import {caseModel, dropModel, userModel} from "@server/models";
import {Punishment} from "@/types/punishment";
import type {CaseData} from "@/types/purchase";

// Компоненты
import {PunishmentSection} from "./components/ratingSection";
import {CasesPurchasesSection} from "./components/casesPurchasesSection";

// Стили
import styles from "./history.module.scss";
import {revalidateTag} from "next/cache";

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
    title: `${name} > Истории действий | Майнбридж`,
    description: `История рейтинга и всяких покупок игрока ${name}!`,
})

export default async function History({params: {name}}: { params: { name: string } }) {
    const {user} = await getUser({name})
    const {user: author, isModer, isAdmin} = await validate()
    const Cases = await caseModel.find().lean()
    const Drops = await dropModel.find().lean()

    async function PunishmentSave(data: Punishment[]) {
        "use server"

        await userModel.findByIdAndUpdate(
            user._id,
            {
                punishments: data,
                rating: data.reduce(
                    (accum, {rating}) => accum + rating, 0
                )
            }
        )

        revalidateTag("userLike")
    }

    async function ratingFunc(formData: FormData) {
        "use server"

        const rating = Number(formData.get("rating"))
        const reason = formData.get("reason")
        const author = formData.get("author")

        if (!reason || !rating || !author || rating === 0) return

        await userModel.findByIdAndUpdate(
            user._id,
            {
                $push: {
                    punishments: {
                        reason,
                        rating,
                        author
                    }
                }
            }
        )

        revalidateTag("userLike")
    }

    async function CasesPurchasesSave(datas: CaseData[]) {
        "use server"

        const userUpdate = await userModel.findById(user._id)
        if (!userUpdate) return

        userUpdate.casesPurchases = []

        datas.forEach(data => {
            userUpdate.casesPurchases.push({
                ...data,
                Case: data.Case._id,
                Drop: data.Drop._id,
                DropItem: data.DropItem._id,
                Item: data.Item._id
            })
        })

        await userUpdate.save()

        revalidateTag("userLike")
    }

    return (
        <div className={styles.content}>
            <h1>История</h1>

            <PunishmentSection
                user={user} author={author} access={isModer} SaveAll={PunishmentSave}
                ratingFunc={ratingFunc}
            />

            <CasesPurchasesSection
                user={user} access={isAdmin} SaveAll={CasesPurchasesSave} Cases={Cases}
                Drops={Drops}
            />
        </div>
    )
}