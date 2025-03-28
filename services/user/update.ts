"use server";
import {cookies} from "next/headers";
import {MBSESSION} from "@/const";
import {RconVC} from "@services/console";
import {userModel} from "@server/models";
import {revalidateTag} from 'next/cache'
import type {User} from "lucia";
import axios from "axios";
import {Social} from "@/types/url";
import {EmailTemplate} from "@app/admin/email/emailTemplate";
import {Resend} from "resend";
import {getUser, getUsers} from "@/services";
import {Who} from "@app/admin/email/components";
import {lucia} from "@server/lucia";
import {MostikiEmail} from "@email/mostiki";

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

    const batchSize = 99;
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

export async function Logout() {
    (await cookies()).delete(MBSESSION)
    await lucia.deleteExpiredSessions()
    revalidateTag("all")
}

export async function UpdateProfile(user: User, formData: FormData, isAdmin: boolean) {
    const name = formData.get("name") as string
    const photo = formData.get("photo") as string
    const fullPhoto = formData.get("fullPhoto") as string

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

        // Смена аккаунта
        const client = await RconVC()
        await client.send(`librelogin user migrate ${user.name} ${name}`)
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
        const newMostiki = Number(formData.get("mostiki"))

        if (newMostiki !== mostiki) {
            if (user.notifications.mostiki) {
                await resend.emails.send({
                    from: 'Майнбридж <mostiki@m-br.ru>',
                    to: user.email,
                    subject: 'Изменения в мостиках на MineBridge',
                    react: MostikiEmail(
                        {name: user.name, mostiki: newMostiki - mostiki, allMostiki: newMostiki}
                    )
                })
            }

            mostiki = newMostiki
        }
    }

    await userModel.findByIdAndUpdate(user._id, {name, photo, fullPhoto, mostiki, socials})

    revalidateTag("userLike")
}