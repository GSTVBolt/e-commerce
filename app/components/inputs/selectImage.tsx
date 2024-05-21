'use client'

import { ImageType } from "@/app/admin/add-products/addProductForm"
import { useCallback } from "react"
import { useDropzone } from 'react-dropzone'

interface SelectImageProps {
    item?: ImageType
    handleFileChange: (value: File) => void
}

export function SelectImage({ item, handleFileChange }: SelectImageProps) {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            handleFileChange(acceptedFiles[0])
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.png'] }
    })

    return (
        <div {...getRootProps()} className="flex items-center justify-center border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-400">
            <input {...getInputProps()} />
            {isDragActive ? (<p>Solte a imagem aqui...</p>) : (<p>+ {item?.color} Imagem</p>)}
        </div>
    )
}