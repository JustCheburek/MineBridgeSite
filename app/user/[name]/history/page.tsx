// Сервер
import axios from "axios";
import {getUser} from "@/services";
import {validate} from "@services/validate";
import {caseModel, dropModel, userModel} from "@server/models";
import {Punishment} from "@/types/punishment";
import type {CaseData} from "@/types/purchase";
import {revalidateTag} from "next/cache";
import {Rcon} from "@server/console";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";
import type {GuildDSUser} from "@/types/user";

// Компоненты
import {PunishmentSection} from "./components/ratingSection";
import {CasesPurchasesSection} from "./components/casesPurchasesSection";

// Стили
import styles from "./history.module.scss";

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
    title: `${name} > Истории действий | Майнбридж`,
    description: `История рейтинга и всяких покупок игрока ${name}!`,
})

export default async function History({params: {name}}: { params: { name: string } }) {
    const {user} = await getUser({name})
    const {user: author, isModer, isAdmin} = await validate(cookies().get(lucia.sessionCookieName)?.value)
    const Cases = await caseModel.find().lean()
    const Drops = await dropModel.find().lean()

    async function checkBan() {
        "use server"

        if (user.rating > -100) return

        if (user.rating <= -200) {
            // Бан в майне
            const client = await Rcon()
            console.log(`Бан ${user.name}`)
            await client.run(`whitelist remove ${user.name}`)
            await client.run(`ban ${user.name}`)
        } else {
            // Разбан в майне
            const client = await Rcon()
            console.log(`Разбан ${user.name}`)
            await client.run(`whitelist add ${user.name}`)
            await client.run(`pardon ${user.name}`)
        }

        if (!user.discordId) return

        if (user.rating <= -300) {
            // Бан
            await axios.put(
                `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/bans/${user.discordId}`,
                {delete_message_days: 7},
                {
                    headers: {
                        Authorization: `Bot ${process.env.DISCORD_TOKEN}`
                    }
                }
            ).catch(console.error)
            return
        } else {
            // Разбан
            await axios.delete(
                `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/bans/${user.discordId}`,
                {
                    headers: {
                        Authorization: `Bot ${process.env.DISCORD_TOKEN}`
                    }
                }
            ).catch(console.error)
        }

        const guildMember = await axios.get<GuildDSUser | null>(
            `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${user.discordId}`,
            {
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_TOKEN}`
                }
            }
        ).then(r => r.data).catch(console.error)

        if (user.rating <= -100) {
            // Мут
            // Добавление роли mute
            if (!guildMember?.roles?.includes(process.env.DISCORD_MUTE_ROLE_ID!)) {
                await axios.put(
                    `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${user.discordId}/roles/${process.env.DISCORD_MUTE_ROLE_ID}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bot ${process.env.DISCORD_TOKEN}`
                        }
                    }
                ).catch(console.error)
            }
        } else {
            // Размут
            // Убирание роли mute
            if (guildMember?.roles?.includes(process.env.DISCORD_MUTE_ROLE_ID!)) {
                await axios.delete(
                    `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${user.discordId}/roles/${process.env.DISCORD_MUTE_ROLE_ID}`,
                    {
                        headers: {
                            Authorization: `Bot ${process.env.DISCORD_TOKEN}`
                        }
                    }
                ).catch(console.error)
            }
        }
    }

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

        await checkBan()

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
                },
                $inc: {
                    rating
                }
            }
        )

        await checkBan()

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