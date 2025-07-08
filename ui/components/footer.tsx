// Компоненты
import { Urls } from './urls'
import { MiniLink } from '@components/button'

export function Policies() {
  return (
    <small className='my-4 flex flex-wrap items-center justify-center gap-x-4 *:w-fit'>
      <MiniLink href='/rules' exact>
        Правила
      </MiniLink>
      <MiniLink href='/rules/legal/terms-of-use'>Пользовательское соглашение</MiniLink>
      <MiniLink href='/rules/legal/privacy-policy'>Политика конфиденциальности</MiniLink>
    </small>
  )
}

export function Footer() {
  const YEAR = new Date().getFullYear()

  return (
    <footer className='flex min-h-[350px] items-center justify-center bg-black flex-none'>
      <div className='p-page flex w-[min(900px,100%)] flex-col items-center'>
        <div>
          <Urls className='urls' />

          {/*Копирайт*/}
          <h4 className='text-center'>&#169; MineBridge 2022-{YEAR}</h4>
        </div>

        <Policies />

        <small className='text-light-gray'>
          Not an official Minecraft product. We are in no way affiliated with or endorsed by Mojang
          Synergies AB, Microsoft Corporation or other rightsholders.
        </small>
      </div>
    </footer>
  )
}
