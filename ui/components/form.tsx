import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import type { setModal } from '@components/modal'
import Link, { type LinkProps } from 'next/link'
import { HorizontalLoadingSvg } from '@ui/SVGS'
import { cn } from '@/lib/utils'
import React from 'react'

// Базовые стили для элементов формы
const ElementStyles =
  'relative py-4 font-medium px-[1.2rem] bg-gray border border-solid border-gray rounded-input transition-all duration-500'
const ButtonStyles = 'text-center font-semibold py-4 px-[3rem] text-unic select-none'

// Стили для разных состояний
const formStateStyles = {
  disabled: 'text-light-gray',
  normal: 'hover:border-unic has-focus-visible:border-unic has-active:border-unic',
  danger: 'hover:border-red has-focus-visible:border-red has-active:border-red',
}

export interface DangerProps {
  danger?: boolean
}

export const Form = ({
  children,
  className = '',
  ...props
}: ComponentPropsWithoutRef<'form'> & { margin?: string | number }) => (
  <form className={cn('m-[20px] grid place-content-center gap-2 p-[5px]', className)} {...props}>
    {children}
  </form>
)

interface FormButton extends ComponentPropsWithoutRef<'button'>, DangerProps {
  isLoading?: boolean
}

export const FormButton = ({
  children,
  className = '',
  danger = false,
  isLoading = false,
  disabled = false,
  ...props
}: FormButton) => (
  <button
    className={cn(
      ElementStyles,
      ButtonStyles,
      danger ? 'text-red' : 'text-unic',
      !disabled && !isLoading && (danger ? formStateStyles.danger : formStateStyles.normal),
      (disabled || isLoading) && formStateStyles.disabled,
      className
    )}
    type='submit'
    disabled={isLoading || disabled}
    {...props}
  >
    {isLoading ? <HorizontalLoadingSvg className='h-[1.15em] w-[7em]' /> : children}
  </button>
)

interface FormLink extends DangerProps, PropsWithChildren, LinkProps {
  className?: string
  download?: boolean
  target?: string
}

export const FormLink = ({
  href,
  children,
  target,
  className = '',
  download = false,
  danger = false,
  ...props
}: FormLink) => {
  if (!target) {
    if (download || href.toString().startsWith('http')) {
      target = '_blank'
    } else {
      target = '_self'
    }
  }

  return (
    <Link
      href={href}
      target={target}
      className={cn(
        ElementStyles,
        ButtonStyles,
        danger ? 'text-red' : 'text-unic',
        danger ? formStateStyles.danger : formStateStyles.normal,
        className
      )}
      download={download}
      {...props}
    >
      {children}
    </Link>
  )
}

interface FormA extends DangerProps, ComponentPropsWithoutRef<'a'> {}

export const FormA = ({
  href,
  children,
  target,
  className = '',
  download = false,
  danger = false,
  ...props
}: FormA) => {
  if (!target) {
    if (download || href?.startsWith('http')) {
      target = '_blank'
    } else {
      target = '_self'
    }
  }

  return (
    <a
      href={href}
      target={target}
      className={cn(
        ElementStyles,
        ButtonStyles,
        danger ? 'text-red' : 'text-unic',
        danger ? formStateStyles.danger : formStateStyles.normal,
        className
      )}
      download={download}
      {...props}
    >
      {children}
    </a>
  )
}

type FormLabelProps = ComponentPropsWithoutRef<'label'> & DangerProps

export const FormLabel = ({
  children,
  className = '',
  danger = false,
  ...props
}: FormLabelProps) => {
  return (
    <label
      className={cn(
        ElementStyles,
        'group select-none',
        danger
          ? formStateStyles.danger + ' has-checked:border-red'
          : formStateStyles.normal + ' has-checked:border-unic',
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
}

type FormGroupProps = ComponentPropsWithoutRef<'div'>
export const FormGroup = ({ children, className = '', ...props }: FormGroupProps) => (
  <div
    className={cn('flex flex-wrap items-center justify-around gap-[10px] [&>*]:flex-1', className)}
    {...props}
  >
    {children}
  </div>
)

export type FormInputProps = ComponentPropsWithoutRef<'input'>
export const FormInput = ({
  children,
  className = '',
  type,
  disabled = false,
  ...props
}: FormInputProps) => (
  <input
    className={cn(
      { hidden: type === 'radio' || type === 'checkbox' },
      type === 'checkbox' ? 'h-[1.2em] w-[1.2em]' : 'min-w-full',

      { [formStateStyles.disabled]: disabled },

      className
    )}
    type={type}
    disabled={disabled}
    {...props}
  />
)

interface FormTextareaProps extends ComponentPropsWithoutRef<'textarea'> {}

export const FormTextarea = ({
  children,
  className = '',
  disabled = false,
  ...props
}: FormTextareaProps) => (
  <textarea
    className={cn(
      ElementStyles,
      formStateStyles.normal,
      'max-sm:resize-vertical max-h-[450px] min-h-[150px] min-w-[250px] max-w-[500px]',
      { [formStateStyles.disabled]: disabled },
      className
    )}
    disabled={disabled}
    {...props}
  />
)

interface FormSelectProps extends ComponentPropsWithoutRef<'select'>, DangerProps {}

export const FormSelect = ({
  children,
  className = '',
  danger = false,
  disabled = false,
  ...props
}: FormSelectProps) => (
  <select
    className={cn(
      ElementStyles,
      'appearance-none',
      !disabled && (danger ? formStateStyles.danger : formStateStyles.normal),
      { [formStateStyles.disabled]: disabled },
      className
    )}
    disabled={disabled}
    {...props}
  >
    {children}
  </select>
)

/*interface EditProps extends ComponentPropsWithoutRef<"button"> {
    setModal: setModal
}

export const Edit = ({className = "", setModal, ...props}: EditProps) => (
    <button className={`edit ${className}`} onClick={() => setModal(true)} {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
        </svg>
    </button>
)*/

interface AddProps extends ComponentPropsWithoutRef<'button'> {
  setModal?: setModal
}

export const Add = ({ className = '', setModal, children, ...props }: AddProps) => (
  <button className={cn('inline-flex items-center justify-center font-medium w-[max(0.55em,0.9rem)] h-[1em] transition-colors duration-300 hover:text-unic active:text-unic', className)} onClick={() => setModal && setModal(true)} {...props}>
    {children || '+'}
  </button>
)
