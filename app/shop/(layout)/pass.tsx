'use client'

import { ComponentPropsWithoutRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { MostikiSvg } from '@ui/SVGS'
import { Form, FormInput, FormLabel, FormLink } from '@components/form'
import { Box, Section, Text, Price } from '@/ui/components/shop'
import { Url } from '@/ui/components/button'

type MostikiButtonProps = {
  mostiki?: number
  disabled?: boolean
} & ComponentPropsWithoutRef<'a'>

export const MostikiButton = ({ mostiki = 1, ...props }: MostikiButtonProps) => (
  <Url href={`/shop/buy?mostiki=${mostiki}`} className='my-[10px]' {...props}>
    Купить
  </Url>
)

function GetMostiki(months: number, selected: number) {
  // 100 -> 0.9, 200 -> 0.8, 300 -> 0.7, 400 -> 0.6, 500 -> 0.5
  const reverse = 1 - selected / 1000
  console.log(selected, reverse)
  const price = (months * 90 + 10) * reverse
  // Округление до ближайщего 5 или 10
  const rounded = Math.round(price / 5) * 5
  return rounded
}

function GetOriginalMostiki(months: number, selected: number) {
  return !!selected ? months * 90 + 10 : months * 100
}

export function Pass({ max }: { max: number }) {
  const [selected, setSelected] = useState(0)

  return (
    <>
      <StarSlider max={max} selected={selected} setSelected={setSelected} />
      <PassSection selected={selected} max={max} />
      <DaySlider selected={selected} />
    </>
  )
}

function PassSection({ selected, max }: { selected: number; max: number }) {
  const month1 = GetMostiki(1, selected)
  const month3 = GetMostiki(3, selected)
  const month12 = GetMostiki(12, selected)

  const origMonth1 = GetOriginalMostiki(1, selected)
  const origMonth3 = GetOriginalMostiki(3, selected)
  const origMonth12 = GetOriginalMostiki(12, selected)

  return (
    <Section>
      <Box>
        {/* <ImgBox hover>
              <Img
                  src={`/shop/month.png`} alt={`Месяц`}
                  width={185}
              />
          </ImgBox> */}
        <Text>
          <h3>1 месяц</h3>
          <Price not={origMonth1 !== month1 ? origMonth1 : undefined}>{month1}</Price>
          <MostikiButton mostiki={month1} disabled={selected > max} />
        </Text>
      </Box>
      <Box>
        {/* <ImgBox hover>
              <Img
                  src={`/shop/3months.png`} alt={`3 месяца`}
                  width={185}
              />
          </ImgBox> */}
        <Text>
          <h3>3 месяца</h3>
          <Price not={origMonth3}>{month3}</Price>
          <MostikiButton mostiki={month3} disabled={selected > max} />
        </Text>
      </Box>
      <Box span2>
        {/* <ImgBox hover>
              <Img
                  src={`/shop/legendary.png`} alt={`Год`}
                  width={185}
              />
          </ImgBox> */}
        <Text>
          <h3>12 месяцев</h3>
          <Price not={origMonth12}>{month12}</Price>
          <MostikiButton mostiki={month12} disabled={selected > max} />
        </Text>
      </Box>
    </Section>
  )
}

export function StarSlider({
  max,
  selected,
  setSelected,
}: {
  max: number
  selected: number
  setSelected: (value: number) => void
}) {
  const values = [0, 100, 200, 300, 400, 500]

  return (
    <div className='borderbox bg-gray/80 mb-8 flex flex-col items-center gap-2 p-4 px-8'>
      <input
        type='range'
        min={0}
        max={values.length - 1}
        step={1}
        value={values.indexOf(selected)}
        onChange={e => setSelected(values[+e.target.value])}
        className={cn('w-full max-w-[40rem]', selected > max ? 'accent-red' : 'accent-faded')}
      />
      <div className='flex w-full max-w-[40rem] flex-wrap justify-between gap-1'>
        {values.map(v => (
          <h4
            key={v}
            className={cn(
              'transition-all duration-300',
              v === selected && 'font-semibold',
              v === selected && v > max ? 'text-red' : '',
              v === selected && v <= max ? 'text-faded' : '',
              v > max ? 'text-red' : 'text-faded'
            )}
          >
            {v}
          </h4>
        ))}
      </div>
    </div>
  )
}

export function DaySlider({ selected }: { selected: number }) {
  const [months, setMonths] = useState(1.5)
  const mostiki = GetMostiki(months, selected)

  return (
    <div className='borderbox bg-gray/80 mt-8 flex flex-col items-center gap-2 p-4 px-8'>
      <div className='text-center'>
        <h3>Количество месяцев</h3>
        <p>Можете выставить своё количество месяцев проходки</p>
      </div>

      <Form className='my-0 flex w-full flex-wrap items-center justify-center *:flex-1'>
        <FormLabel>
          <FormInput
            type='number'
            value={months}
            onChange={e => setMonths(+e.target.value)}
            min={1}
            max={36}
            step={0.5}
            className='text-center'
          />
        </FormLabel>
        <FormLink href={`/shop/buy?mostiki=${mostiki}`} className='my-[10px]'>
          Купить за {mostiki} <MostikiSvg />
        </FormLink>
      </Form>
    </div>
  )
}
