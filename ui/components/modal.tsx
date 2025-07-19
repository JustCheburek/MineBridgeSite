// React
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'

export type setModal = Dispatch<SetStateAction<boolean>>
export type ModalAction = { modal: boolean; setModal: setModal }

type Modal = ModalAction & {
  className?: string
  centerText?: boolean
}

export function Modal({
  modal,
  setModal,
  children,
  className = '',
  centerText = true,
}: PropsWithChildren<Modal>) {
  // Добавляем overflow: hidden к body при открытии модального окна
  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [modal])

  return (
    <section
      className={cn(
        'group pointer-events-none fixed inset-0 flex h-auto w-full items-start justify-center overflow-y-scroll p-5 font-medium opacity-0 transition-all duration-500',
        centerText && 'text-center',
        modal && 'pointer-events-auto z-50 opacity-100 backdrop-blur-md',
        className
      )}
      onClick={() => setModal(false)}
    >
      <div
        className='card relative z-50 m-auto min-h-[min(70%,300px)] min-w-[min(70%,500px)] scale-50 bg-black/60 px-12 pb-5 pt-10 backdrop-blur-xl transition-transform duration-500 group-[.opacity-100]:scale-100'
        onClick={e => e.stopPropagation()}
      >
        <button
          className='text-unic rounded-base absolute right-[0.8rem] top-[0.3rem] p-[0.8rem] font-bold'
          onClick={() => setModal(false)}
        >
          ✕
        </button>
        {children}
      </div>
    </section>
  )
}
