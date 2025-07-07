'use client'

import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import { Button } from '@components/button'
import { cn } from '@/lib/utils'
import { List } from '@components/rules'

export function BlacklistContent() {
  const [show, setShow] = useState<boolean>(false)

  return (
    <>
      <Button onClick={() => setShow(prev => !prev)}>
        {show ? <>Скрыть</> : <>Показать</>}
      </Button>

      <ul className="space-y-5">
        <li>
          <p>Высказывания на основе принадлежности к социальной группе</p>

          <WordsContainer show={show}>
            Пидор, пидорас, педик, гомосек
          </WordsContainer>
        </li>
        <li>
          <p>Высказывания по признакам пола, расы</p>

          <WordsContainer show={show}>
            Ниггер, пендос, жид
          </WordsContainer>
        </li>
        <li>
          <p>Высказывания, направленные на разжигание межнациональной розни</p>

          <WordsContainer show={show}>
            Хохол, кацап, хач
          </WordsContainer>
        </li>
        <li>
          <p>В негативном смысле, оскорбление кого-либо</p>

          <WordsContainer show={show}>
            Аутист, даун, симп, инцел, додик
          </WordsContainer>
        </li>
      </ul>
    </>
  )
}

function WordsContainer({
  children,
  show,
}: PropsWithChildren<{ show: boolean }>) {
  const words = children as string
  const wordsWithSuffix = words + ' и т. д.'
  
  // Автоматически генерируем скрытый текст, заменяя слова на ×
  const hidden = words
    .split(', ')
    .map(word => '×'.repeat(word.length))
    .join(', ') + ' × ×. ×.'

  return (
    <div className="relative my-2 flex select-none">
      <small 
        className={cn(
          "absolute text-light-gray-color opacity-0 transition-all duration-500 left-0",
          show ? "opacity-100 translate-x-0" : "-translate-x-[10%]"
        )}
      >
        {wordsWithSuffix}
      </small>
      <small 
        className={cn(
          "text-light-gray-color tracking-[0.5px] opacity-0 transition-all duration-500",
          !show ? "opacity-100 translate-x-0" : "translate-x-[10%]"
        )}
      >
        {hidden}
      </small>
    </div>
  )
}
