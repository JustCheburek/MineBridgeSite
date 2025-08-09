import { userModel } from '@/db/models'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  if (process.env.NEXT_PUBLIC_DAYS !== 'on') {
    return Response.json({ success: false, message: 'Days is off' })
  }

  // const users = await userModel.updateMany(
  //   {
  //     days: { $gt: 0 },
  //   },
  //   {
  //     $inc: {
  //       days: -1,
  //     },
  //   }
  // )

  // console.log(`-1 день у ${users.modifiedCount} пользователей`)
  // return Response.json({ success: true, updated: users.modifiedCount })

  const user = await userModel.findOne(
    {
      name: 'JustCheburek',
    },
    {
      $inc: {
        days: -1,
      }
    }
  )

  if (!user) {
    return Response.json({ success: false, message: 'User not found' })
  }

  return Response.json({ success: true, days: user.days, name: user.name })
}
