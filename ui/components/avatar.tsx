'use client'

// Сервер
import { useState } from 'react'
import type { User } from 'lucia'

// Компоненты
import { Img, ImgBox } from '@components/img'
import { cn } from '@/lib/utils'

type Avatar = {
  src: User['photo']
  className?: string
}

export default function Avatar({ src, className = '' }: Avatar) {
  const [photo, setPhoto] = useState<string>(src)

  return (
    <ImgBox className={cn('size-[180px] overflow-hidden !rounded-[25%]', className)} hover>
      <Img
        src={photo}
        alt='Ава'
        className='object-cover transition-transform group-hover:scale-110'
        onError={() => setPhoto('/person.svg')}
      />
    </ImgBox>
  )
}
