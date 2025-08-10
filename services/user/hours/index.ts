import { unstable_cache as cache } from 'next/cache'
import { sqlPool } from '@/db/models'

export const getTime = cache(
  async (name: string): Promise<number> => {
    try {
      const [rows] = await sqlPool.execute('SELECT * FROM playtimes WHERE name = ?', [name])
      // @ts-ignore
      const time = rows[0].time
      return Math.floor(time / 60 / 60)
    } catch (e) {
      console.error('Ошибка при получении часов:', e)
      return -1
    }
  },
  ['hours', 'time', 'all'],
  { revalidate: 300, tags: ['hours', 'time', 'all'] }
)
