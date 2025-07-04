// React
import type { PropsWithChildren } from 'react'

// Компоненты
import { Url } from './button'
import { SearchSvg } from '@ui/SVGS'
import { cn } from '@/lib/utils'

export function NotFound({
  children,
  buttonText,
  href,
}: PropsWithChildren<{ buttonText: string; href: string }>) {
  return (
    <section className='my-[25px] grid gap-6 text-center max-[1200px]:hidden'>
      <SearchSvg className='text-unic mx-auto size-[8rem]' />
      <h3 className='text-unic'>Не нашли нужную информацию?</h3>

      <p>
        Нажмите <code>CTRL + F</code> на windows или <code>CMD + F</code> на мак
        <br />
        {children}
      </p>

      {/* Кнопка */}
      <Url href={href} className='mt-[10px]'>
        {buttonText}
      </Url>
    </section>
  )
}
