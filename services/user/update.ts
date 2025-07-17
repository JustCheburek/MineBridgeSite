'use server'

import { RconVC } from '@services/console'
import { userModel } from '@db/models'
import { revalidateTag } from 'next/cache'
import type { User } from 'lucia'
import axios from 'axios'
import { Urls, urlsLabels } from '@/types/url'
import { Resend } from 'resend'
import { MostikiEmail } from '@email/mostiki'
import { ExtraStateId, StateId } from '@/types/state'

const resend = new Resend(process.env.RESEND_API_KEY)

/*function chunk<T>(arr: T[], size: number) {
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
}*/

type Data = ExtraStateId<{
  isAdmin: boolean
}>
export async function UpdateProfile(
  { data: { _id, isAdmin } }: Data,
  formData: FormData
): Promise<Data> {
  const user = await userModel.findById(_id)

  if (!user) {
    return { success: false, error: 'Пользователь не найден', data: { _id, isAdmin } }
  }

  const name = formData.get('name') as string
  const photo = formData.get('photo') as string
  const fullPhoto = formData.get('fullPhoto') as string
  const urls: Record<string, string> = {}

  // калькулируем новый вложенный set для urls:
  for (const { name } of urlsLabels) {
    const v = formData.get(name)
    if (v != null) {
      urls[`urls.${ name }`] = v.toString()
    }
  }

  if (name !== user.name) {
    const candidate = await userModel.findOne({ name })
    if (candidate) {
      return { success: false, error: 'Ник занят', data: { _id, isAdmin } }
    }
    if (user.discordId) {
      await axios
        .patch(
          `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${user.discordId}`,
          {
            nick: name,
          },
          {
            headers: {
              Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            },
          }
        )
        .catch(console.error)
    }

    // Смена аккаунта
    const client = await RconVC()
    await client.send(`librelogin user migrate ${user.name} ${name}`)
  }

  let mostiki = user.mostiki
  if (isAdmin) {
    const newMostiki = Number(formData.get('mostiki'))

    if (newMostiki !== mostiki) {
      if (user?.notifications?.mostiki) {
        await resend.emails.send({
          from: 'Майнбридж <mostiki@m-br.ru>',
          to: user.email,
          subject: 'Изменения в мостиках на MineBridge',
          react: MostikiEmail({
            name: user.name,
            mostiki: newMostiki - mostiki,
            allMostiki: newMostiki,
          }),
        })
      }

      mostiki = newMostiki
    }
  }

  await userModel.findByIdAndUpdate(user._id, {
    name,
    photo,
    fullPhoto,
    mostiki,
    ...urls,
  })

  revalidateTag('userLike')

  return { success: true, data: { _id, isAdmin } }
}
