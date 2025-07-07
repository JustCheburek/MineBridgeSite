'use client'
import { formatFileSize } from '@edgestore/react/utils'
import * as React from 'react'
import { type DropzoneOptions, useDropzone } from 'react-dropzone'
import { UploadSvg } from '@ui/SVGS'
import { cn } from '@/lib/utils'

const ERROR_MESSAGES = {
  'too-many-files': (maxFiles: number) => `Макс файлов - ${maxFiles}`,
  'file-too-large': (maxSize: number) => `Макс размер -  ${formatFileSize(maxSize)}`,
  'file-invalid-type': () => 'Неверный тип',
  'file-not-supported': () => 'Неподдерживаемый тип',
}

type ImgUpload = {
  className?: string
  value?: File | string
  onChange?: (file?: File) => void | Promise<void>
  disabled?: boolean
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>
}

export function ImgUpload({
  dropzoneOptions,
  value,
  disabled,
  onChange,
  className = '',
}: ImgUpload) {
  const imageUrl = React.useMemo(() => {
    if (typeof value === 'string') return value
    if (value) return URL.createObjectURL(value)
    return null
  }, [value])

  const { getRootProps, getInputProps, acceptedFiles, fileRejections, isDragAccept, isDragReject } =
    useDropzone({
      accept: { 'image/*': [] },
      multiple: false,
      disabled,
      onDrop: acceptedFiles => {
        const file = acceptedFiles[0]
        if (file) void onChange?.(file)
      },
      ...dropzoneOptions,
    })

  const errorMessage = React.useMemo(() => {
    if (fileRejections[0]) {
      const { errors } = fileRejections[0]
      // @ts-ignore
      const getMessage = ERROR_MESSAGES[errors[0]?.code]
      if (getMessage) {
        return getMessage(dropzoneOptions?.maxFiles ?? 0)
      } else {
        return ERROR_MESSAGES['file-not-supported']
      }
    }
    return
  }, [fileRejections, dropzoneOptions])

  return (
    <>
      <div
        {...getRootProps({
          className: cn(
            'relative flex cursor-pointer flex-col items-center justify-center text-white',
            'borderbox rounded-input bg-gray/80 hover:border-unic',
            'min-h-[200px] overflow-hidden transition-all duration-500',
            {
              'bg-gray border-light-gray pointer-events-none cursor-default': disabled,
              'border-unic bg-blue-500/10': isDragAccept,
              'border-red bg-red-500/10': isDragReject || fileRejections[0],
            },
            className
          ),
        })}
      >
        <input {...getInputProps()} />
        {imageUrl ? (
          <img
            className='aspect-square h-full max-h-[250px] w-full object-cover'
            src={imageUrl}
            alt={acceptedFiles[0]?.name}
            title={acceptedFiles[0]?.name}
          />
        ) : (
          <div className='grid place-items-center text-center'>
            <UploadSvg className='mx-auto size-[3rem]' />

            <p>
              Место для твоих
              <br />
              фоток
            </p>
          </div>
        )}
        {imageUrl && !disabled && (
          <button
            className={cn(
              'absolute right-2 top-2 size-8',
              'flex items-center justify-center',
              'borderbox bg-black/50 backdrop-blur-md',
              'hover:text-red transition-all duration-500'
            )}
            onClick={e => {
              e.stopPropagation()
              void onChange?.(undefined)
            }}
          >
            <strong>X</strong>
          </button>
        )}
      </div>
      {errorMessage && <small className='text-red'>{errorMessage}</small>}
    </>
  )
}
