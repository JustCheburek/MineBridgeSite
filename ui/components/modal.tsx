// React
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'

// Стили
import './styles/modal.scss'

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
  return (
    <section
      className={`modal font-medium ${centerText ? 'text-center' : ''} ${modal ? 'active background' : ''} ${className}`}
      onClick={() => setModal(false)}
    >
      <div className='modal_text border' onClick={e => e.stopPropagation()}>
        <button className='close_modal font-bold' onClick={() => setModal(false)}>
          x
        </button>
        {children}
      </div>
    </section>
  )
}
