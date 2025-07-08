import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru'
import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

TimeAgo.addLocale(ru)
const timeAgo = new TimeAgo('ru-RU')

export const LastUpdate = ({ time, className, ...props }: { time: Date } & ComponentPropsWithoutRef<'p'>) => (
  <p className={cn('text-center', className)} {...props}>
    Последнее изменение:{' '}
    <time dateTime={time.toISOString()}>
      <strong className='text-unic'>{timeAgo.format(time)}</strong>{' '}
      <small>({time.toLocaleDateString('ru-RU', { dateStyle: 'long' })})</small>
    </time>
  </p>
)
