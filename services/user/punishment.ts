'use server'
import type { User } from 'lucia'
import { Punishment } from '@/types/punishment'
import { RconVC } from '@services/console'
import axios from 'axios'
import { userModel } from '@db/models'
import { revalidateTag } from 'next/cache'
import { NewRatingEmail } from '@email/newRating'
import { Resend } from 'resend'
import { RatingEmail } from '@email/rating'
import { z } from 'zod/v4'
import type { StateId } from '@/types/state'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function SavePunishments(_id: string, data: Punishment[]) {
  const user = await userModel.findById(_id)
  if (!user) return

  const oldRating = user.rating
  user.rating = data.reduce((accum, { rating }) => accum + rating, 0)
  user.punishments = data

  await user.save()

  revalidateTag('userLike')

  if (oldRating !== user.rating && user?.notifications?.rating) {
    await resend.emails.send({
      from: 'Майнбридж <rating@m-br.ru>',
      to: user.email,
      subject: 'Изменения в звёздах на MineBridge',
      react: RatingEmail({ name: user.name, rating: user.rating, oldRating }),
    })
  }
}

async function CheckActions(user: User, mine?: 'ban' | 'pardon', ds?: 'ban' | 'pardon') {
  if (!mine && !ds) return

  try {
    if (mine === 'ban') {
      const client = await RconVC()
      console.log(`Бан в майне ${user.name}`)
      await client.send(`ban ${user.name} Нарушение правил сервера`)
      client.disconnect()
    }
    if (mine === 'pardon') {
      const client = await RconVC()
      console.log(`Разбан в майне ${user.name}`)
      await client.send(`unban ${user.name}`)
      client.disconnect()
    }
  } catch (e) {
    console.error(e)
  }

  if (!user.discordId) return

  if (ds === 'ban') {
    console.log(`Бан в дискорде ${user.name}`)
    await axios
      .put(
        `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/bans/${user.discordId}`,
        { delete_message_days: 7 },
        {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
          },
        }
      )
      .catch(console.error)
  }
  if (ds === 'pardon') {
    console.log(`Разбан в дискорде ${user.name}`)
    await axios
      .delete(
        `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/bans/${user.discordId}`,
        {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
          },
        }
      )
      .catch(console.error)
  }
}

const punishmentSchema = z.object({
  reason: z.string().min(1, 'Укажите причину'),
  rating: z.preprocess(val => Number(val), z.number().int()),
  author: z.string().min(1, 'Укажите автора'),
  mine: z.enum(['ban', 'pardon']).optional(),
  ds: z.enum(['ban', 'pardon']).optional(),
})

export async function AddPunishment(
  { data: { _id } }: StateId,
  formData: FormData
): Promise<StateId> {
  const result = punishmentSchema.safeParse(Object.fromEntries(formData.entries()))

  console.log(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '),
      data: { _id },
    }
  }

  const { reason, rating, author, mine, ds } = result.data

  try {
    const user = (await userModel.findById(_id)) as User
    if (!user) return { success: false, error: 'Пользователь не найден', data: { _id } }

    const punishment = {
      reason,
      rating,
      author,
    } satisfies Punishment

    await userModel.findByIdAndUpdate(user._id, {
      $push: {
        punishments: punishment,
      },
      $inc: {
        rating: punishment.rating,
      },
    })

    await CheckActions(user, mine, ds)

    revalidateTag('userLike')

    if (user.notifications?.rating) {
      await resend.emails.send({
        from: 'Майнбридж <rating@m-br.ru>',
        to: user.email,
        subject: 'Изменения в звёздах на MineBridge',
        react: NewRatingEmail({
          name: user.name,
          rating: user.rating + punishment.rating,
          punishment,
        }),
      })
    }

    return { success: true, data: { _id } }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ошибка при добавлении звёзд',
      data: { _id },
    }
  }
}
