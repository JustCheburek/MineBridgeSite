// React
import type { ComponentPropsWithRef } from 'react'

// Компоненты
import { Img, ImgBox } from '@components/img'
import { cn } from '@/lib/utils'

type BoxProps = ComponentPropsWithRef<'article'>
const Box = ({ children, className, ...props }: BoxProps) => {
  return (
    <article
      className={cn('appear mx-auto grid w-fit place-items-center gap-12', className)}
      {...props}
    >
      {children}
    </article>
  )
}

const UnicSection = () => (
  <section className='bg-black text-center'>
    <div className='xs:grid-cols-2 2md:grid-cols-4 container mx-auto grid gap-12'>
      {/* Цена */}
      <Box>
        <ImgBox
          className="flex h-[180px] w-[180px] -rotate-[4deg] items-center justify-center bg-[url('/index/unic/barrier.webp')] 
            bg-contain bg-center
            bg-no-repeat drop-shadow-[0_0_40px_rgb(204,25,9)]
            filter transition-all duration-500 hover:-rotate-[9deg] hover:drop-shadow-[0_0_80px_rgb(204,25,9)] hover:[&>img]:rotate-[14deg] hover:[&>img]:scale-105"
        >
          <Img
            width={80}
            height={80}
            src='/index/unic/moneta.webp'
            alt='Монета'
            className='rotate-[4deg] drop-shadow-[0_0_30px_rgb(255,170,0)] filter transition-all duration-500'
            pixel
          />
        </ImgBox>
        <p>
          Дешёвая
          <br />
          проходка
        </p>
      </Box>

      {/* Кастомизация */}
      <Box className='appear-start-17'>
        <Img
          src='/index/unic/amogus.webp'
          alt='Амогус'
          width={160}
          className='rotate-[3.5deg] drop-shadow-[0_0_60px_rgba(255,163,0,0.7)] filter 
            transition-all duration-500 
            hover:rotate-[8.5deg] hover:drop-shadow-[0_0_80px_rgb(255,163,0)]'
          pixel
        />
        <p>
          Уникальная
          <br />
          кастомизация
        </p>
      </Box>

      {/* Ивенты */}
      <Box className='appear-start-21'>
        <Img
          src='/index/unic/calendar.webp'
          alt='Календарь'
          width={160}
          className='-rotate-[5.5deg] drop-shadow-[0_0_60px_rgba(56,104,224,0.7)] filter 
            transition-all duration-500 
            hover:-rotate-[8.5deg] hover:drop-shadow-[0_0_80px_rgb(56,104,224)]'
          pixel
        />
        <p>
          Интересные
          <br />
          ивенты
        </p>
      </Box>

      {/* Комьюнити */}
      <Box className='appear-start-35'>
        <Img
          src='/index/unic/heart.webp'
          alt='heart'
          width={165}
          className='rotate-[4.6deg] drop-shadow-[0_0_60px_rgba(255,9,0,0.7)] filter 
            transition-all duration-500 
            hover:rotate-[9.6deg] hover:drop-shadow-[0_0_80px_rgb(255,9,0)]'
          pixel
        />
        <p>
          Дружелюбное
          <br />
          комьюнити
        </p>
      </Box>
    </div>
  </section>
)

export default UnicSection
