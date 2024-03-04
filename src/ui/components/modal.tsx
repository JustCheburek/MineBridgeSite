// Стили
import './styles/modal.scss'

export function Modal({modal, setModal, children, className=""}) {
    return (
        <section className={`modal medium-font center_text ${modal ? 'active' : ''} ${className}`}
                 onClick={() => setModal(false)}>
            <div className="modal_text border" onClick={e => e.stopPropagation()}>
                <button className="close_modal bold-font" onClick={() => setModal(false)}>
                    x
                </button>
                {children}
            </div>
        </section>
    )
}