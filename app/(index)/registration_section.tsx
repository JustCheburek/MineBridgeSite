import { Url } from '@components/button'

const RegistrationSection = () => (
  <section className='py-page grid place-items-center text-center appear'>
    <article className='md:px-page md:card hidden_once grid w-[min(910px,90%)] md:pb-[10px] md:pt-[50px]'>
      <div className='grid gap-8'>
        <h2 className='text-unic'>Заходи прямо сейчас</h2>
        <p className='max-[1200px]:hidden'>
          {process.env.NEXT_PUBLIC_VERSION} · Minecraft: Java Edition · Лицензия не обязательна
        </p>
        <p className='min-[1200px]:hidden'>
          {process.env.NEXT_PUBLIC_VERSION}
          <br />
          Minecraft: Java + Bedrock Edition
          <br />
          Лицензия не обязательна
        </p>
      </div>

      <Url href='/auth'>Влететь на сервер</Url>
    </article>
  </section>
)

export default RegistrationSection
