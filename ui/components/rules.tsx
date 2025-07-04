import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import { StarSvg } from '@ui/SVGS'
import { LinkNumber } from '@components/number'
import { cn } from '@/lib/utils'

type RulesBox = {
  name: string
  heading: string
  number: number
  marker?: boolean
}

export const RulesBox = ({
  name,
  heading,
  number,
  marker = false,
  children,
}: PropsWithChildren<RulesBox>) => {
  return (
    <section className='my-[1.2em]' id={name}>
      {/* Заголовок */}
      <div className='mb-[1.2rem] grid grid-cols-[auto_1fr]'>
        {/* Цифра */}
        <LinkNumber href={name}>{number}</LinkNumber>

        {/* Кнопка */}
        <h3>{heading}</h3>
      </div>

      {/* Содержание */}
      <List id={name + '_box'} className='pl-[5px]' marker={marker}>
        {/* Rule */}
        {children}
      </List>
    </section>
  )
}

type Rule = {
  number: number
  text?: string
  stars?: number
} & PropsWithChildren

export const Rule = ({ number, children, stars, text }: Rule) => (
  <li className='relative my-[1.2rem] grid has-[a]:grid-cols-[auto_1fr]' id={number?.toString()}>
    <LinkNumber href={number.toString()} box={false}>
      {number}
    </LinkNumber>

    <div className='rule-text'>
      {children}
      {(stars || text) && <Punishment stars={stars} text={text} />}
    </div>
  </li>
)

export const DotRule = ({ children }: PropsWithChildren) => (
  <li className='my-[1.2rem]'>{children}</li>
)

export const Punishment = ({ text, stars }: { text?: string; stars?: number }) => (
  <p className='text-light-gray absolute bottom-[1px] right-0 text-right opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
    {text}
    {text && stars && ' / '}
    {stars && (
      <>
        {'-'}
        {stars}
        <StarSvg className='size-[0.75em]' />
      </>
    )}
  </p>
)

type List = ComponentPropsWithoutRef<'ul'> & { marker?: boolean }
export const List = ({ children, className, marker = true, ...props }: List) => (
  <ul className={cn({ 'list-inside list-disc': marker }, className)} {...props}>
    {children}
  </ul>
)
