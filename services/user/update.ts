"use server";
import {cookies} from "next/headers";
import {MBSESSION} from "@/const";
import {AddWLConsole, RconVC, RemoveWLConsole} from "@server/console";
import {userModel} from "@server/models";
import {unstable_expireTag as expireTag} from "next/cache";
import {User} from "lucia";
import {Action, Punishment} from "@/types/punishment";
import {CaseData} from "@/types/purchase";
import axios from "axios";
import {Social} from "@/types/url";
import type {GuildDSUser} from "@/types/user";
import {EmailTemplate} from "@app/admin/email/emailTemplate";
import {Resend} from "resend";
import {getUser, getUsers} from "@/services";
import {Who} from "@app/admin/email/components";
import {redirect} from "next/navigation";

const resend = new Resend(process.env.RESEND_API_KEY);

function chunk<T>(arr: T[], size: number) {
    return Array.from({
            // длина списка в сотках
            length: Math.ceil(arr.length / size)
        }, (_, i) =>
            // каждая сотка, начиная с 0
            arr.slice(i * size, (i + 1) * size)
    );
}

export async function SendEmail(formData: FormData) {
    const who = formData.get("who") as Who

    if (who === "person") {
        const name = formData.get("name") as string

        const {user} = await getUser({name})

        if (!user) {
            throw new Error("Игрок не найден")
        }

        await resend.emails.send({
            from: 'Майнбридж <no-reply@m-br.ru>',
            to: user.email, // user.email,
            subject: 'MineBridge 7 сезон',
            react: EmailTemplate({name: user.name})
        })

        return
    }

    const batchSize = 100;
    const users = await getUsers();

    for (const batch of chunk(users, batchSize)) {
        const emails = batch.map((user) => ({
            from: 'Майнбридж <no-reply@m-br.ru>',
            to: user.email,
            subject: 'MineBridge 7 сезон',
            react: EmailTemplate({name: user.name})
        }));
        await resend.batch.send(emails);
    }
}

export async function CheckActions(user: User, actions: Action[]) {
    if (actions.length === 0) return

    try {
        if (actions.includes("mineBan")) {
            const client = await RconVC()
            console.log(`Бан ${user.name}`)
            await RemoveWLConsole(user.name)
            await client.run(`ban ${user.name} Нарушение правил сервера`)
            if (actions.includes("rollback")) {
                await client.run(`co rollback action:block user:${user.name} time:14d`)
                await client.run(`co rollback action:container user:${user.name} time:14d`)
            }
            await userModel.findByIdAndUpdate(user._id, {whitelist: false})
        }
        if (actions.includes("minePardon")) {
            const client = await RconVC()
            console.log(`Разбан ${user.name}`)
            await AddWLConsole(user.name)
            await client.run(`unban ${user.name}`)

            await userModel.findByIdAndUpdate(user._id, {whitelist: true})
        }
    } catch (e) {
        console.error(e)
    }

    if (actions.includes("dsBan")) {
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
    }
    if (actions.includes("dsPardon")) {
        await axios.delete(
            `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/bans/${user.discordId}`,
            {
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_TOKEN}`
                }
            }
        ).catch(console.error)
    }

    if (actions.includes("mute") || actions.includes("unmute")) {
        try {
            const client = await RconVC()
            if (actions.includes("mute")) {
                console.log(`Мут ${user.name}`)
                await client.run(`mute ${user.name}`)
            }
            if (actions.includes("unmute")) {
                console.log(`Размут ${user.name}`)
                await client.run(`unmute ${user.name}`)
            }
        } catch (e) {
            console.error(e)
        }

        if (!user.discordId) return

        const guildMember = await axios.get<GuildDSUser | null>(
            `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${user.discordId}`,
            {
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_TOKEN}`
                }
            }
        ).then(r => r.data).catch(console.error)

        const isMuted = guildMember?.roles?.includes(process.env.DISCORD_MUTE_ROLE_ID!)

        if (actions.includes("mute")) {
            if (isMuted) return

            // Добавление роли mute
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
        if (actions.includes("unmute")) {
            if (!isMuted) return

            // Убирание роли mute
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

export async function Logout() {
    (await cookies()).delete(MBSESSION)
}

export async function AddWhitelist(_id: string, name: string) {
    try {
        await AddWLConsole(name)

        await userModel.findByIdAndUpdate(_id, {whitelist: true})
    } catch (e) {
        console.error(e)
    }

    expireTag(`userLike`)
}

export async function AddPunishment(user: User, punishment: Punishment, actions: Action[]) {
    if (punishment.reason && punishment.rating) {
        await userModel.findByIdAndUpdate(
            user._id,
            {
                $push: {
                    punishments: punishment
                },
                $inc: {
                    rating: punishment.rating
                }
            }
        )
    }

    await CheckActions(user, actions)

    expireTag("userLike")
}

export async function SelectSuffix(suffix: string, _id: string) {
    await userModel.findByIdAndUpdate(_id, {
        suffix
    })

    expireTag("userLike")
}

export async function AddSuffix(formData: FormData, _id: string, index: number) {
    const suffix = formData.get("name") as string

    const user = await userModel.findByIdAndUpdate(_id)

    if (!user) {
        throw new Error(`Пользователь не найден`)
    }

    user.casesPurchases[index].suffix = suffix
    user.suffix = suffix

    await user.save()

    expireTag("userLike")
}

export async function AddCasePurchase(_id: string, CaseData: CaseData, access: boolean) {
    if (!access) return

    await userModel.findByIdAndUpdate(
        _id,
        {
            $push: {
                casesPurchases: {
                    ...CaseData,
                    Case: CaseData.Case._id,
                    Drop: CaseData.Drop._id,
                    DropItem: CaseData.DropItem._id,
                    Item: CaseData.Item._id
                }
            },
        }
    )

    expireTag("userLike")
}

export async function UpdateProfile(user: User, formData: FormData, isAdmin: boolean) {
    const name = formData.get("name") as string
    const photo = formData.get("photo") as string

    if (name !== user.name) {
        const candidate = await userModel.findOne({name})
        if (candidate) {
            throw new Error(`Ник занят`)
        }
        if (user.discordId) {
            await axios.patch(
                `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${user.discordId}`,
                {
                    nick: name
                },
                {
                    headers: {
                        Authorization: `Bot ${process.env.DISCORD_TOKEN}`
                    }
                }
            ).catch(console.error)
        }
    }

    const socials: Social[] = [
        {name: formData.get("youtube")?.toString(), social: "youtube"},
        {name: formData.get("twitch")?.toString(), social: "twitch"},
        {name: formData.get("vk")?.toString(), social: "vk"},
        {name: formData.get("donationAlerts")?.toString(), social: "donationAlerts"},
        {url: formData.get("discord")?.toString(), social: "discord"},
        {url: formData.get("telegram")?.toString(), social: "telegram"},
    ]

    socials.forEach(({url, social}) => {
        if (url && !url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/)) {
            throw new Error(`Некорректная ссылка в ${social}`)
        }
    })

    let mostiki = user.mostiki
    if (isAdmin) {
        mostiki = Number(formData.get("mostiki"))
    }

    if (user.name !== name) {
        await RemoveWLConsole(user.name)

        // Смена аккаунта
        const client = await RconVC()
        await client.run(`librelogin user migrate ${user.name} ${name}`)

        await AddWLConsole(name)
    }

    await userModel.findByIdAndUpdate(user._id, {name, photo, mostiki, socials})

    expireTag("userLike")

    redirect(`/user/${name}`)
}