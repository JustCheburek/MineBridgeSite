import Link from 'next/link'
import { YouTubeEmbed } from '@next/third-parties/google'

const YtSection = () => (
  <section className='mx-auto my-[60px] grid max-w-[min(700px,100%)] place-items-center gap-12 text-center'>
    <div className='grid gap-4'>
      <h2 className='text-unic'>Всё ещё не уверен?</h2>
      <h3>
        Тогда посмотри этот{' '}
        <Link href='https://youtu.be/m7ipkVv_FPE' target='_blank'>
          видосик
        </Link>
      </h3>
    </div>

    <div className='borderbox size-full overflow-hidden appear-scale'>
      <YouTubeEmbed videoid='m7ipkVv_FPE' params='controls=0'/>
    </div>
  </section>
)

export default YtSection
