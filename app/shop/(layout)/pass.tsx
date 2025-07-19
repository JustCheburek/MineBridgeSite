'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { MostikiSvg } from '@ui/SVGS'
import { Form, FormButton, FormInput, FormLabel } from '@components/form'
import { Box, Section, Text, Price } from '@/ui/components/shop'
import { Button } from '@/ui/components/button'
import { BuyModal } from '@/ui/components/modals/buy'
import type { User } from 'lucia'
import { GetMostiki, GetOriginalMostiki } from '@/lib/utils'

type BuyButtonProps = {
  author: User | null
  setModal: (modal: boolean) => void
  setMonths: (months: number) => void
  months: number
}
function BuyButton({ author, setModal, setMonths, months }: BuyButtonProps) {
  if (!author) {
    return <Button className='my-2.5'>Войти</Button>
  }

  return (
    <Button
      className='my-2.5'
      onClick={() => {
        setMonths(months)
        setModal(true)
      }}
    >
      Купить
    </Button>
  )
}

export function Pass({ author }: { author: User | null }) {
  const [months, setMonths] = useState(1.5)
  const [selected, setSelected] = useState(0)
  const [modal, setModal] = useState(false)

  return (
    <>
      <StarSlider max={author?.faded_rating ?? 0} selected={selected} setSelected={setSelected} />
      <PassSection selected={selected} author={author} setModal={setModal} setMonths={setMonths} />
      <DaySlider months={months} setMonths={setMonths} selected={selected} setModal={setModal} />
      {author && (
        <BuyModal
          modal={modal}
          setModal={setModal}
          author={author}
          months={months}
          faded_rating={selected}
        />
      )}
    </>
  )
}

type StarSliderProps = {
  max: number
  selected: number
  setSelected: (value: number) => void
}
export function StarSlider({ max, selected, setSelected }: StarSliderProps) {
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
        title={`-${selected / 10}%`}
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
            title={v !== 0 ? `-${v / 10}%` : ''}
          >
            {v}
          </h4>
        ))}
      </div>
    </div>
  )
}

type PassSectionProps = {
  selected: number
  author: User | null
  setModal: (modal: boolean) => void
  setMonths: (months: number) => void
}
function PassSection({ selected, author, setModal, setMonths }: PassSectionProps) {
  const month1 = GetMostiki(1, selected)
  const month3 = GetMostiki(3, selected)
  const month12 = GetMostiki(12, selected)

  const origMonth1 = GetOriginalMostiki(1)
  const origMonth3 = GetOriginalMostiki(3)
  const origMonth12 = GetOriginalMostiki(12)

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
          <Price not={origMonth1}>{month1}</Price>
          <BuyButton author={author} setModal={setModal} setMonths={setMonths} months={1} />
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
          <BuyButton author={author} setModal={setModal} setMonths={setMonths} months={3} />
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
          <BuyButton author={author} setModal={setModal} setMonths={setMonths} months={12} />
        </Text>
      </Box>
    </Section>
  )
}

type DaySliderProps = {
  months: number
  setMonths: (months: number) => void
  selected: number
  setModal: (modal: boolean) => void
}
export function DaySlider({ months, setMonths, selected, setModal }: DaySliderProps) {
  const mostiki = GetMostiki(months, selected)

  return (
    <div className='borderbox bg-gray/80 mt-8 flex flex-col items-center gap-2 p-4 px-8'>
      <div className='text-center'>
        <h3>Количество месяцев</h3>
        <p>Можно поставить своё количество месяцев проходки</p>
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
        <FormButton className='my-[10px]' onClick={() => setModal(true)} type='button'>
          Купить за {mostiki} <MostikiSvg />
        </FormButton>
      </Form>
    </div>
  )
}
