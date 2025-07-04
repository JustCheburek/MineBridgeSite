'use client'

// Типы
import { Case } from '@/types/case'
import { cn } from '@/lib/utils'

// Компоненты
import { Img, ImgBox } from '@components/img'

export type CaseBoxProps = {
  Case: Case
} & ImgBox
export function CaseBox({ Case, children, className, ...props }: CaseBoxProps) {
  const caseStyles = {
    common: 'drop-shadow-[0_0_10px] drop-shadow-common/40',
    rare: 'drop-shadow-[0_0_15px] drop-shadow-rare/50',
    legendary: 'drop-shadow-[0_0_17px] drop-shadow-legendary/50',
  }

  return (
    <ImgBox
      className={cn(
        'mx-auto size-[185px] filter',
        caseStyles[Case.name as keyof typeof caseStyles],
        className
      )}
      hover
      {...props}
    >
      <Img
        src={`/shop/${Case.name}.png`}
        alt={`${Case.displayname} кейс`}
        className='size-full'
      />
      {children}
    </ImgBox>
  )
}
