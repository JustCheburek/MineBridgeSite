"use server";
import type {User} from "lucia";
import {Action, Punishment} from "@/types/punishment";
import {RconVC} from "@services/console";
import axios from "axios";
import type {GuildDSUser} from "@/types/user";
import {userModel} from "@server/models";
import {revalidateTag} from "next/cache";
import {NewRatingEmail} from "@email/newRating";
import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function CheckActions(user: User, actions: Action[]) {
    if (actions.length === 0) return

    try {
        if (actions.includes("mineBan")) {
            const client = await RconVC()
            console.log(`Бан ${user.name}`)
            await client.send(`ban ${user.name} Нарушение правил сервера`)
            if (actions.includes("rollback")) {
                await client.send(`co rollback user:${user.name} time:3w radius:#global`)
            }
            client.disconnect()
        }
        if (actions.includes("minePardon")) {
            const client = await RconVC()
            console.log(`Разбан ${user.name}`)
            await client.send(`unban ${user.name}`)
            client.disconnect()
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
                await client.send(`mute ${user.name}`)
            }
            if (actions.includes("unmute")) {
                console.log(`Размут ${user.name}`)
                await client.send(`unmute ${user.name}`)
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

    revalidateTag("userLike")

    await resend.emails.send({
        from: 'Майнбридж <rating@m-br.ru>',
        to: user.email,
        subject: 'Изменения в звёздах на MineBridge',
        react: NewRatingEmail({
            name: user.name, rating: user.rating + punishment.rating, punishment
        })
    })
}