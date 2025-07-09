'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export function StarSlider({ max }: { max: number }) {
  const values = [0, 100, 200, 300, 400, 500]
  const [selected, setSelected] = useState(0)

  return (
    <div className='borderbox bg-gray/80 mb-8 flex flex-col items-center gap-2 p-4 px-8'>
      <input
        type='range'
        min={0}
        max={values.length - 1}
        step={1}
        value={values.indexOf(selected)}
        onChange={e => setSelected(values[+e.target.value])}
        className={cn('w-full max-w-[40rem]', selected > max ? 'accent-red' : 'accent-yellow')}
      />
      <div className='flex w-full max-w-[40rem] flex-wrap justify-between gap-1'>
        {values.map(v => (
          <h4
            key={v}
            className={cn(
              'transition-all duration-300',
              v === selected && 'font-semibold',
              v === selected && v > max ? 'text-red' : '',
              v === selected && v <= max ? 'text-yellow' : '',
              v > max ? 'text-red' : 'text-yellow'
            )}
          >
            {v}
          </h4>
        ))}
      </div>
    </div>
  )
}
