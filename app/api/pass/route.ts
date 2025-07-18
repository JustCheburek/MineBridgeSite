import { userModel } from '@/db/models'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  const user = await userModel.findOneAndUpdate(
    {
      name: 'JustCheburek',
      days: { $gt: 0 },
    },
    {
      $inc: {
        days: -1,
      },
    },
    {
      new: true,
    }
  )

  if (!user) {
    return new Response('User not found', {
      status: 404,
    })
  }

  return Response.json({ success: true, days: user.days })
}
