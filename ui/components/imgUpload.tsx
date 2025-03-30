'use client';
import {formatFileSize} from '@edgestore/react/utils';
import * as React from 'react';
import {type DropzoneOptions, useDropzone} from 'react-dropzone';
import styles from './styles/imgUpload.module.scss';
import {UploadSvg} from "@ui/SVGS";

const ERROR_MESSAGES = {
    "too-many-files": (maxFiles: number) => `Макс файлов - ${maxFiles}`,
    'file-too-large': (maxSize: number) => `Макс размер -  ${formatFileSize(maxSize)}`,
    'file-invalid-type': () => 'Неверный тип',
    'file-not-supported': () => 'Неподдерживаемый тип'
};

type InputProps = {
    className?: string;
    value?: File | string;
    onChange?: (file?: File) => void | Promise<void>;
    disabled?: boolean;
    dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
};

export function ImgUpload(
    {dropzoneOptions, value, disabled, onChange, className = ""}: InputProps,
) {
    const imageUrl = React.useMemo(() => {
        if (typeof value === 'string') return value;
        if (value) return URL.createObjectURL(value);
        return null;
    }, [value]);

    const {
        getRootProps,
        getInputProps,
        acceptedFiles,
        fileRejections,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: {'image/*': []},
        multiple: false,
        disabled,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) void onChange?.(file);
        },
        ...dropzoneOptions,
    });

    const errorMessage = React.useMemo(() => {
        if (fileRejections[0]) {
            const {errors} = fileRejections[0];
            // @ts-ignore
            const getMessage = ERROR_MESSAGES[errors[0]?.code]
            if (getMessage) {
                return getMessage(dropzoneOptions?.maxFiles ?? 0)
            } else {
                return ERROR_MESSAGES["file-not-supported"]
            }
        }
        return
    }, [fileRejections, dropzoneOptions]);

    return (
        <>
            <div
                {...getRootProps({
                    className: `flex_center ${
                        styles.singleImageDropzone
                    } ${
                        disabled ? styles.disabled : ''
                    } ${
                        imageUrl ? styles.image : ''
                    } ${
                        (isDragReject || fileRejections[0]) ? styles.reject : ''
                    } ${
                        isDragAccept ? styles.accept : ''
                    } ${
                        className
                    }`
                })}>
                <input {...getInputProps()}/>
                {imageUrl ? (
                    <img
                        className={styles.imagePreview}
                        src={imageUrl}
                        alt={acceptedFiles[0]?.name}
                        title={acceptedFiles[0]?.name}
                    />
                ) : (
                    <div className="grid_center center_text">
                        <UploadSvg size="3rem" className="marginAuto"/>

                        <p>
                            Место для твоих<br/>
                            фоток
                        </p>
                    </div>
                )}
                {imageUrl && !disabled && (
                    <button
                        className={`flex_center ${styles.remove_button}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            void onChange?.(undefined);
                        }}
                    >
                        <strong>
                            X
                        </strong>
                    </button>
                )}
            </div>
            {errorMessage && (
                <small className="red_color">{errorMessage}</small>
            )}
        </>
    );
}