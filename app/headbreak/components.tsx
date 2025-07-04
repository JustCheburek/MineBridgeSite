'use client'

import { useState } from 'react'
import { Form, FormLabel } from '@components/form'
import { cn, Random } from '@/lib/utils'
import { HookButton } from '@components/hookbutton'

type Element = '' | '⚪' | '❌' | '❓️' | '❔'
type Path = Element[]
type Buttons = Path[]

export function HeadBreakBox() {
  const [step, setStep] = useState(0)
  const [nextStep, setNextStep] = useState<boolean>(false)
  const steps: { path: Path; buttons: Buttons }[] = [
    {
      path: ['', '', '', '', ''] as Path,
      buttons: [
        ['❌', '⚪', '', '❌', '⚪'],
        ['⚪', '❌', '', '', '⚪'],
        ['', '', '⚪', '', ''],
        ['⚪', '', '', '❌', '⚪'],
        ['', '', '❌', '⚪', ''],
        ['❌', '', '', '⚪', '⚪'],
      ],
    },
    {
      path: ['', '', '', '', '', '', '', '', ''],
      buttons: [
        ['⚪', '', '❓️', '❌', '⚪', '', '', '', '❓️', ''],
        ['⚪', '❔', '❓️', '⚪', '❌', '', '❌', '❓️', '❓️', '⚪'],
        ['❓️', '', '⚪', '❌', '', '⚪', '⚪', '', '❓️', '⚪'],
        ['⚪', '', '❌', '⚪', '❔', '', '❓️', '❓️', '❓️', '⚪'],
        ['', '⚪', '', '❓️', '⚪', '', '', '⚪', '❔', '❓️'],
      ],
    },
    {
      path: [],
      buttons: [[]],
    },
  ]
  const [path, setPath] = useState<Path>(steps[step].path)

  const updatePath = (path: Path) => {
    setPath((prev: Path) => {
      const newPath = path.reduce<Path>((acc, current, i) => {
        if (current === '⚪') {
          acc.push('⚪')
        } else if (current === '❌') {
          acc.push('')
        } else if (current === '❓️') {
          const random = Random(2)
          acc.push(random === 0 ? '⚪' : '')
        } else if (current === '❔') {
          const random = Random(2)
          acc.push(random === 0 ? prev[i] : '')
        } else {
          acc.push(prev[i])
        }
        return acc
      }, [])
      setNextStep(newPath.filter(element => element === '').length === 0)
      return newPath
    })
  }

  return (
    <>
      {step < 2 ? (
        <>
          <h3 className="my-6 text-center xs:hidden">
            Зайдите с устройства большего размера для наилучшего экспериенса
          </h3>

          <div className={cn("grid grid-cols-5 mb-4 borderbox overflow-hidden", {
            "grid-cols-5": step === 0,
            "grid-cols-10": step === 1,
          })}>
            {path.map((e, index) => (
              <p
                key={index}
                className="flex items-center justify-center borderbox rounded-none w-26 h-20 text-h3"
              >
                {e}
              </p>
            ))}
          </div>

          {steps[step].buttons.map((path, index) => (
            <label className={cn("borderbox overflow-hidden grid", {
              "grid-cols-5": step === 0,
              "grid-cols-10": step === 1,
            })} key={index}>
              {path.map((e, index) => (
                <button
                  key={index}
                  className="flex items-center justify-center borderbox rounded-none w-26 h-20 text-h3"
                  onClick={() => {
                    updatePath(path)
                  }}
                >
                  {e}
                </button>
              ))}
            </label>
          ))}

          <Form
            action={() => {
              setPath(steps[step + 1].path)
              setStep(step + 1)
              setNextStep(false)
            }}
          >
            <HookButton disabled={!nextStep}>Дальше</HookButton>
          </Form>
        </>
      ) : (
        <>
          <h2 className='text-center'>Завершено</h2>

          <p>Перед получением нужно зайти на майнбридж на выживание</p>
          <p>Получить награду можно только 1 раз</p>

          <p className='text-red'>Устарело</p>

          <Form action=''>
            <HookButton disabled>Получить награду</HookButton>
          </Form>
        </>
      )}
    </>
  )
}
