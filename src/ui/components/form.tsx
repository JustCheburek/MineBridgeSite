import "./styles/form.scss"
import type {ComponentPropsWithoutRef} from "react";

export const FormButton = (
    {
        children,
        className = "",
        ...props
    }: ComponentPropsWithoutRef<"button">) => (
    <button
        className={`form_button center_text ${className}`}
        type="submit"
        {...props}
    >
        <strong>
            {children}
        </strong>
    </button>
)

export const FormLabel = ({children, className = ""}: ComponentPropsWithoutRef<"label">) => (
    <label className={`form_label ${className}`}>
        {children}
    </label>
)

export const FormGroup = ({children, className = ""}: ComponentPropsWithoutRef<"div">) => (
    <div className={`form_group ${className}`}>
        {children}
    </div>
)

/*
export const Edit = ({setModal}: { setModal?: (value: boolean) => void }) => (
    <button className="edit" onClick={() => setModal && setModal(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="edit" viewBox="0 0 16 16">
            <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
        </svg>
    </button>
)

export const Add = ({setModal}: { setModal?: (value: boolean) => void }) => (
    <button className="add" onClick={() => setModal && setModal(true)}>
        +
    </button>
)*/
