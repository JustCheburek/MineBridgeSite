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
}

const AdvantageImgBox = ({ src, alt }: AdvantageImgBoxProps) => (
  <ImgBox
    className={cn(
      'border-3 border-light-gray rounded-base w-[min(550px,100%)] max-lg:appear',
      'transition-all duration-1000',
      'hover:border-unic',
      'shadow-light-gray/90 hover:shadow-unic shadow-[0_5px_20px] hover:shadow-[0_5px_35px]',
      'group-[.right]:lg:multi-["col-start-2;row-start-1;shadow-[5px_5px_20px];hover:shadow-[10px_5px_35px];appear-right"]',
      'group-[.left]:lg:multi-["col-start-1;row-start-1;shadow-[-5px_5px_20px];hover:shadow-[-10px_5px_35px];appear-left"]'
    )}
    type='post'
  >
    <Img src={src} alt={alt} />
  </ImgBox>
)

const Text = ({ children }: PropsWithChildren) => (
  <h4 className={cn(
    'min-w-[60%]',
    'group-[.left]:lg:appear-right group-[.right]:lg:appear-left',
    'max-lg:appear'
  )}>
    {children}
  </h4>
)

// Side - картинка слева или справа
const Box = ({ children, side }: PropsWithChildren<{ side: 'left' | 'right' }>) => (
  <article
    className={cn(
      'grid min-w-full max-w-[800px] place-items-center gap-16',
      'lg:grid-cols-2',
      'max-lg:text-center',
      'group', side
    )}
  >
    {children}
  </article>
)

const AdvantageSection = () => (
  <section className='px-page bg-black pt-[100px]'>
    <MaxSize className='grid place-items-center gap-32 bg-black'>
      {/* Информация о создании групп */}
      <Box side='left'>
        <AdvantageImgBox src='/index/advantage/group.webp' alt='Ивент пандорума' />
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
      <Box side='right'>
        <AdvantageImgBox src='/index/advantage/project.webp' alt='Пандорум здание' />
        <Text>
          Строй города и фермы
          <br />с другими игроками!
        </Text>
      </Box>

      {/* Информация о данжах */}
      <Box side='left'>
        <AdvantageImgBox src='/index/advantage/dungeon.webp' alt='Эндский данж' />
        <Text>
          Изучай новые данжи
          <br />и структуры!
        </Text>
      </Box>

      {/* Информация о кастомизации */}
      <Box side='right'>
        <AdvantageImgBox src='/index/advantage/pet.webp' alt='Питомец' />
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
