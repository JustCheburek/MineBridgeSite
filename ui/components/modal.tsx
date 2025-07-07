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
        'fixed inset-0 flex justify-center items-start w-full h-auto opacity-0 pointer-events-none transition-all duration-500 overflow-y-scroll p-5 font-medium group',
        centerText && 'text-center',
        modal && 'opacity-100 pointer-events-auto z-50 backdrop-blur-md',
        className
      )}
      onClick={() => setModal(false)}
    >
      <div 
        className="relative m-auto min-w-[min(70%,500px)] min-h-[min(70%,300px)] pt-10 px-12 pb-5 z-50 scale-50 transition-transform duration-500 borderbox bg-black/50 backdrop-blur-xl group-[.opacity-100]:scale-100"
        onClick={e => e.stopPropagation()}
      >
        <button 
          className="absolute top-[0.3rem] right-[0.8rem] text-unic p-[0.8rem] rounded-base font-bold"
          onClick={() => setModal(false)}
        >
          x
        </button>
        {children}
      </div>
    </section>
  )
}
