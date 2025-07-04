import type { PropsWithChildren } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Img, ImgBox } from '@components/img'
import { MaxSize } from '@components/maxSize'

/*
export function Video({name}) {
    const play = e => {
        e.target?.play().catch(() => console.error)
    }

    const pause = e => {
        e.target?.pause()
    }

    return (
        <video
            className="video_box blur_box" onMouseEnter={play} onMouseLeave={pause}
            onClick={() => play} muted
        >
            <source
                src={`/index/${name}.mp4`}
                className="video" type="video/mp4"
            />
            <p>
                {name}
            </p>
        </video>
    )
}
*/

type AdvantageImgBoxProps = {
  src: string
  alt: string
  side: 'left' | 'right'
}

const AdvantageImgBox = ({ src, alt, side }: AdvantageImgBoxProps) => (
  <ImgBox
    className={cn(
      'border-3 border-light-gray rounded-base w-[min(550px,100%)]',
      'transition-all duration-1000',
      'hover:border-unic',
      'shadow-[0_5px_20px_var(--light-gray-color)] hover:shadow-[0_5px_35px_var(--unic-color)]',
      side === 'right'
        ? 'lg:col-start-2 lg:row-start-1 lg:shadow-[30px_5px_20px_var(--light-gray-color)] lg:hover:shadow-[30px_5px_35px_var(--unic-color)]'
        : 'lg:col-start-1 lg:row-start-1 lg:shadow-[-30px_5px_20px_var(--light-gray-color)] lg:hover:shadow-[-30px_5px_35px_var(--unic-color)]'
    )}
    type='post'
  >
    <Img src={src} alt={alt} />
  </ImgBox>
)

const Text = ({ children }: PropsWithChildren) => <h4 className='min-w-[60%]'>{children}</h4>

const Box = ({ children }: PropsWithChildren) => (
  <article
    className={cn(
      'grid min-w-full max-w-[800px] place-items-center gap-16',
      'lg:grid-cols-2',
      'max-lg:text-center'
    )}
  >
    {children}
  </article>
)

const AdvantageSection = () => (
  <section className='px-page bg-black pt-[100px]'>
    <MaxSize className='grid place-items-center gap-32 bg-black'>
      {/* Информация о создании групп */}
      <Box>
        <AdvantageImgBox src='/index/advantage/group.webp' alt='Ивент пандорума' side='left' />
        <Text>
          Объединяйся в{' '}
          <Link
            href='https://discord.com/channels/1012334719230292048/1114389800947036261'
            className='text-unic'
            target='_blank'
          >
            кланы
          </Link>
          <br />
          и играй вместе
          <br />
          со своими друзьями!
        </Text>
      </Box>

      {/* Информация о городах */}
      <Box>
        <AdvantageImgBox src='/index/advantage/project.webp' alt='Пандорум здание' side='right' />
        <Text>
          Строй города и фермы
          <br />с другими игроками!
        </Text>
      </Box>

      {/* Информация о данжах */}
      <Box>
        <AdvantageImgBox src='/index/advantage/dungeon.webp' alt='Эндский данж' side='left' />
        <Text>
          Изучай новые данжи
          <br />и структуры!
        </Text>
      </Box>

      {/* Информация о кастомизации */}
      <Box>
        <AdvantageImgBox src='/index/advantage/pet.webp' alt='Питомец' side='right' />
        <Text>
          Кастомизируй свой внешний вид!
          <br />
          <Link href='/shop' className='text-unic small font-medium'>
            <small>Купить уникальные украшения</small>
          </Link>
        </Text>
      </Box>

      {/* Информация о создании проектов */}
      {/*<Box>
            <Img name="project" alt="Проект"/>
            <Text>
                Реализуй то, что всегда хотел,<br/>
                но на что никогда<br/>
                не было времени!
            </Text>
        </Box>*/}
    </MaxSize>
  </section>
)

export default AdvantageSection
