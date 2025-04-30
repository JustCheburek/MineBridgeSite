"use server";
import type {User} from "lucia";
import {Action, Punishment} from "@/types/punishment";
import {RconVC} from "@services/console";
import axios from "axios";
import {userModel} from "@db/models";
import {revalidateTag} from "next/cache";
import {NewRatingEmail} from "@email/newRating";
import {Resend} from "resend";
import {RatingEmail} from "@email/rating";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function SavePunishments(_id: string, data: Punishment[]) {
    const user = await userModel.findById(_id)
    if (!user) return

    const oldRating = user.rating
    user.rating = data.reduce(
        (accum, {rating}) => accum + rating, 0
    )
    user.punishments = data

    await user.save()

    revalidateTag("userLike")

    if (oldRating !== user.rating && user?.notifications?.rating) {
        await resend.emails.send({
            from: 'Майнбридж <rating@m-br.ru>',
            to: user.email,
            subject: 'Изменения в звёздах на MineBridge',
            react: RatingEmail({name: user.name, rating: user.rating, oldRating})
        })
    }
}

async function CheckActions(user: User, actions: Action[]) {
    if (actions.length === 0) return

    try {
        if (actions.includes("mineBan")) {
            const client = await RconVC()
            console.log(`Бан ${user.name}`)
            await client.send(`ban ${user.name} Нарушение правил сервера`)
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