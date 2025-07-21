'use server'

import { userModel } from '@db/models'
import { User } from 'lucia'
import { unstable_cache as cache } from 'next/cache'

export const getUsersWhitelist = cache(
  async () => {
    const users: User[] = JSON.parse(
      JSON.stringify(
        await userModel.find(
          { whitelist: true },
          {
            name: 1,
            photo: 1,
            mostiki: 1,
            rating: 1,
            createdAt: 1,
            days: 1,
          },
          { lean: true }
        )
      )
    )
    return users
  },
  ['usersWhitelist', 'userLike', 'all'],
  { revalidate: 300, tags: ['usersWhitelist', 'userLike', 'all'] }
)
