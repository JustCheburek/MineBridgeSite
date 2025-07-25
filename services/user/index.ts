'use server'

import type { User } from 'lucia'
import { notFound } from 'next/navigation'
import { unstable_cache as cache } from 'next/cache'
import { userModel } from '@db/models'
import type { GuildDSUser } from '@/types/user'
import axios from 'axios'
import type { Role } from '@/types/role'
import { AUTO, NO_ROLES, ROLES, ROLES_START } from '@/const'
import { From } from '@/types/invite'
import { InviteEmail } from '@email/invite'
import { Resend } from 'resend'
import { idOrNameUser } from '@/types/idOrName'

const resend = new Resend(process.env.RESEND_API_KEY)

interface isRoles {
  isHelper: boolean
  isModer: boolean
  isAdmin: boolean
  isContentMaker: boolean
}

export interface RolesApi extends isRoles {
  roles: Role[]
}

export const getRoles = cache(
  async (discordId?: string): Promise<RolesApi> => {
    if (!discordId) {
      return { roles: [], ...NO_ROLES }
    }

    const allRoles = await axios
      .get<Role[]>(`https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/roles`, {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        },
      })
      .then(r => r.data)

    const dsUser = await axios
      .get<GuildDSUser>(
        `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${discordId}`,
        {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
          },
        }
      )
      .then(r => r.data)
      .catch(console.error)

    const roles = allRoles.filter(({ id }) => dsUser?.roles?.includes(id))
    const isDonate = roles?.some(({ name }) => name.toLowerCase().includes(ROLES.donate))

    // Привилегии
    let isAdmin = false,
      isModer = false,
      isHelper = false
    if (!isDonate) {
      isAdmin = roles?.some(({ name }) => name.toLowerCase().includes(ROLES.admin))
      isModer = isAdmin || roles?.some(({ name }) => name.toLowerCase().includes(ROLES.moder))
      isHelper = isModer || roles?.some(({ name }) => name.toLowerCase().includes(ROLES.helper))
    }

    const isContentMaker = roles?.some(({ name }) => name.toLowerCase().includes(ROLES.content))

    return { roles, isHelper, isModer, isAdmin, isContentMaker }
  },
  ['roles', 'userLike', 'all'],
  { revalidate: 300, tags: ['roles', 'userLike', 'all'] }
)

// Получение всех контент-мейкеров (стримеров и ютуберов)
export const getAllContentMakers = cache(
  async (): Promise<User[]> => {
    const users: User[] = JSON.parse(
      JSON.stringify(
        await userModel.find(
          {
            urls: { $ne: {} },
          },
          {
            name: 1,
            photo: 1,
            mostiki: 1,
            rating: 1,
            urls: 1,
            onlineAt: 1,
            discordId: 1,
          },
          {
            lean: true,
            sort: { name: 1 },
          }
        )
      )
    )

    return users.filter(user => user.urls?.youtube)
  },
  ['contentMakers', 'userLike', 'all'],
  { revalidate: 600, tags: ['contentMakers', 'userLike', 'all'] }
)

type GetUser = {
  throwNotFound?: boolean
  roles?: boolean
  authorId?: User['_id']
  show?: boolean
} & idOrNameUser
export const getUser = cache(
  async ({ name, _id, throwNotFound = true, roles = false, authorId, show = false }: GetUser) => {
    let userM

    if (name) {
      userM = await userModel.findOne({ name }, {}, { lean: true })
    } else {
      userM = await userModel.findById(_id, {}, { lean: true })
    }

    const user: User | null = JSON.parse(JSON.stringify(userM))

    if (!user) {
      if (throwNotFound) {
        console.error(`User не найден: ${name ?? _id}`)
        notFound()
      }

      throw new Error(`User не найден: ${name ?? _id}`)
    }

    const isMe = authorId ? authorId.toString() === user._id.toString() : false

    if (!show && !isMe) {
      user.email = '×'.repeat(user.email.length - 4) + user.email.substring(user.email.length - 4)

      const googleId = user.googleId?.toString()
      const twitchId = user.twitchId?.toString()
      if (googleId) {
        user.googleId = '×'.repeat(googleId.length - 4) + googleId.substring(googleId.length - 4)
      }
      if (twitchId) {
        user.twitchId = '×'.repeat(twitchId.length - 4) + twitchId.substring(twitchId.length - 4)
      }
    }

    if (roles && user?.discordId) {
      const rolesApi = await getRoles(user.discordId)
      return {
        user,
        isMe,
        ...rolesApi,
        isContentMakerCheck: (isMe || rolesApi.isHelper) && rolesApi.isContentMaker,
      }
    }

    return {
      user,
      isMe,
      ...NO_ROLES,
      isContentMakerCheck: false,
      roles: [],
    }
  },
  ['user', 'userLike', 'all'],
  { revalidate: 300, tags: ['user', 'userLike', 'all'] }
)

export const getAuthor = cache(
  async (id?: string): Promise<{ user: User | null } & RolesApi> => {
    const user: User | null = JSON.parse(
      JSON.stringify(
        await userModel.findByIdAndUpdate(id, { onlineAt: new Date() }, { lean: true })
      )
    )

    return { user, ...(await getRoles(user?.discordId)) }
  },
  ['author', 'userLike', 'all'],
  { revalidate: 120, tags: ['author', 'userLike', 'all'] }
)

export const getUsers = cache(
  async () => {
    const users: User[] = JSON.parse(
      JSON.stringify(
        await userModel.find(
          {},
          {
            name: 1,
            photo: 1,
            mostiki: 1,
            rating: 1,
            createdAt: 1,
            onlineAt: 1,
            updatedAt: 1,
            invites: 1,
            from: 1,
            whitelist: 1,
            suffix: 1,
            faded_rating: 1,
            days: 1,
          },
          {
            lean: true,
            sort: { createdAt: -1 },
          }
        )
      )
    )

    return users
  },
  ['users', 'userLike', 'all'],
  { revalidate: 300, tags: ['users', 'userLike', 'all'] }
)

export const getUsersL = cache(
  async () => {
    return userModel.countDocuments({}, { lean: true })
  },
  ['users', 'userLike', 'all'],
  { revalidate: 450, tags: ['users', 'userLike', 'all'] }
)

export const updateFrom = cache(
  async (user: User, from: { place: string; name: string }, authorRoles: Role[]): Promise<From> => {
    const rolePlace = authorRoles.find(({ name }) => name.startsWith(ROLES_START.place))
    const roleName = authorRoles.find(({ name }) => name.startsWith(ROLES_START.name))
    const rPlace = rolePlace?.name.substring(ROLES_START.place.length)
    const rName = roleName?.name.substring(ROLES_START.name.length)

    async function updateInviter(inviter: User, isContentMaker: boolean) {
      const mostiki = isContentMaker ? 10 : 0

      await userModel.findByIdAndUpdate(inviter._id, {
        $push: {
          invites: user._id,
          punishments: {
            reason: `Позвал ${user.name}`,
            rating: 5,
            author: AUTO.MOD,
          },
        },
        $inc: {
          rating: 5,
          mostiki,
        },
      })

      if (inviter.notifications.invite) {
        await resend.emails.send({
          from: 'Майнбридж <invite@m-br.ru>',
          to: inviter.email,
          subject: `Приглашение ${user.name} на MineBridge`,
          react: InviteEmail({ name: user.name, from, isContentMaker }),
        })
      }
    }

    if (rPlace) {
      let userInfo
      if (rName) {
        userInfo = await getUser({
          name: rName,
          throwNotFound: false,
        }).catch(console.error)
      }
      const inviter = userInfo?.user

      if (
        !user.from?.userId &&
        inviter &&
        !inviter.invites.some(id => String(id) === String(user._id))
      ) {
        await updateInviter(inviter, true)
      }

      return { place: rPlace, userId: inviter?._id }
    }

    const nullFrom = { place: undefined, userId: undefined }
    if (!from) return nullFrom

    const { place, name } = from
    if (!place || user.name === name) {
      return nullFrom
    }

    const userInfo = await getUser({ name, throwNotFound: false }).catch(console.error)
    const inviter = userInfo?.user
    const isContentMaker = userInfo?.isContentMakerCheck || false
    if (
      !user.from?.userId &&
      inviter &&
      !inviter.invites.some(id => String(id) === String(user._id))
    ) {
      await updateInviter(inviter, isContentMaker)
    }

    return { place, userId: inviter?._id }
  },
  ['from'],
  { revalidate: 3600, tags: ['from'] }
)
