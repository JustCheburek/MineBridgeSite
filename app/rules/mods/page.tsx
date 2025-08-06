// React
import type { Metadata } from 'next'

// Компоненты
import { NotFound } from '@components/notFound'
import { OnThisPage, OnThisPageBox, OnThisPageLink } from '@components/sideNav'
import { ErrorSvg, SuccessSvg } from '@ui/SVGS'
import Link from 'next/link'
import { H1 } from '@components/h1'
import { List } from '@components/rules'

export const metadata: Metadata = {
  title: 'Файлы',
  description: 'Списки разрешённых и запрещённых дополнений. Здесь также есть сборки!',
}

export default function Mods() {
  type Name = { name: string; url?: URL }
  type NameUrl = Required<Name>

  const packs: NameUrl[] = [
    {
      name: 'JustCheburek 1.21',
      url: new URL('https://modrinth.com/modpack/minebridge-pack'),
    }
  ]

  const recommendMods: NameUrl[] = [
    {
      name: 'PlasmoVoice',
      url: new URL('https://modrinth.com/plugin/plasmo-voice'),
    },
    {
      name: 'EmoteCraft',
      url: new URL('https://modrinth.com/mod/emotecraft'),
    },
    {
      name: 'Cit Resewn',
      url: new URL('https://modrinth.com/mod/cit-resewn'),
    },
    {
      name: 'RP Renames',
      url: new URL('https://modrinth.com/mod/rp-renames'),
    },
    {
      name: 'No Chat Reports',
      url: new URL('https://modrinth.com/mod/no-chat-reports'),
    },
    {
      name: 'Ресурспак MineBridge',
      url: new URL('./MBfull.zip', process.env.NEXT_PUBLIC_RU_URL!),
    },
  ]

  const mods: Name[] = [
    {
      name: 'Миникарта',
    },
    {
      name: 'Моды на оптимизацию',
    },
    {
      name: 'Отображение информации о мобах, предметах, крафтах, оружии, шалкерах, освещённости',
    },
    {
      name: 'Litematica (easy place mod)',
      url: new URL('https://curseforge.com/minecraft/mc-mods/litematica'),
    },
    {
      name: 'FlashBack (только для видео)',
      url: new URL('https://modrinth.com/mod/flashback/version/latest'),
    },
    {
      name: 'Bobby',
      url: new URL('https://modrinth.com/mod/bobby/version/latest'),
    },
    {
      name: 'InvMove',
      url: new URL('https://modrinth.com/mod/invmove/version/latest'),
    },
    {
      name: 'Gamma Utils',
      url: new URL('https://modrinth.com/mod/gamma-utils/version/latest'),
    },
  ]

  const blacklist: string[] = [
    'Модификации, выполняющие действия за игрока (ИИ, принтер и так далее, но автокликер разрешён)',
    'Чит-модификации',
    'Модификации, позволяющие летать сквозь блоки не выходя с сервера',
    'Aristois',
    'Baritone',
    'Better PVP',
    'ClientCommands',
    'CMDCam',
    'Impact',
    'Inertia',
    'Jello',
    'LavaClearView',
    'MultiConnect (используйте только ViaFabric / Forge)',
    'SeedCracker (или другие моды и программы, выполняющие функции этого мода)',
    'Sigma',
    'StepUp',
    'Tweakeroo',
    'Wall-Jump',
    'Wurst',
    'Xray',
  ]

  return (
    <>
      <div className='mods_content'>
        <H1>Файлы</H1>

        <section id='allowed_mods' className='mt-[25px]'>
          <div className='py-[30px] text-center'>
            <h2 className='text-green flex items-center justify-center gap-4'>
              <SuccessSvg />
              Разрешено
            </h2>
            <h3>Моды</h3>
          </div>
          <h4>Сборки модов:</h4>
          <List className='marker:text-light-gray'>
            {packs.map(pack => (
              <li key={pack.name}>
                <Link href={pack.url.toString()} target='_blank' className='text-unic font-medium'>
                  {pack.name}
                </Link>
              </li>
            ))}
          </List>
          <br />
          <p>Если собираете свою сборку, то</p>
          <h4>Необходимо скачать:</h4>
          <List className='marker:text-light-gray'>
            {recommendMods.map(mod => (
              <li key={mod.name}>
                <Link href={mod.url.toString()} target='_blank' className='text-unic font-medium'>
                  {mod.name}
                </Link>
              </li>
            ))}
          </List>
          <br />
          <h4>Разрешённые моды:</h4>
          <List className='marker:text-light-gray'>
            {mods.map(mod => (
              <li key={mod.name}>
                {mod?.url ? (
                  <Link href={mod.url.toString()} target='_blank' className='text-unic'>
                    {mod.name}
                  </Link>
                ) : (
                  mod.name
                )}
              </li>
            ))}
          </List>
          <br />
          <p>Нерекомендуемый мод: Exordium</p>
          <p>Он ломает ресурс паки сервера, из-за него появляются красная обводка экрана</p>
        </section>

        <section id='allowed_rps' className='mt-[25px]'>
          <h3 className='py-[30px] text-center'>Ресурспаки</h3>
          <h4>
            Обязательный:{' '}
            <Link
              href={new URL('./MBfull.zip', process.env.NEXT_PUBLIC_RU_URL!).toString()}
              className='text-unic font-medium'
            >
              MB (полный)
            </Link>
          </h4>
          <p>
            По желанию:{' '}
            <Link href='https://modrinth.com/resourcepack/aseprite-fonts' className='text-unic'>
              Шрифт
            </Link>
          </p>
          <br />
          <p>
            Разрешены все ресурспаки, которых нет в списке {`"`}запрещено{`"`}
          </p>
        </section>

        <section id='forbidden' className='mt-[25px]'>
          <h2 className='text-red flex items-center justify-center gap-4 py-[30px] text-center'>
            <ErrorSvg />
            Запрещено
          </h2>

          <List className='marker:text-light-gray select-none'>
            {blacklist.map(mod => (
              <li key={mod}>{mod}</li>
            ))}
          </List>
        </section>

        <NotFound buttonText='Тех поддержка' href='https://discord.gg/f95V9Rezqy'>
          Если всё равно не нашёл мод, обратитесь в техподдержку и тебе сообщат, можно ли
          использовать его!
        </NotFound>
      </div>

      <OnThisPage>
        <OnThisPageLink href='#allowed'>Разрешено</OnThisPageLink>
        <OnThisPageBox>
          <OnThisPageLink href='#allowed_mods'>Моды</OnThisPageLink>
          <OnThisPageLink href='#allowed_rps'>Ресурспаки</OnThisPageLink>
        </OnThisPageBox>
        <OnThisPageLink href='#forbidden'>Запрещено</OnThisPageLink>
      </OnThisPage>
    </>
  )
}
