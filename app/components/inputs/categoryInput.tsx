'use client'

import { IconType } from "react-icons"

interface CategoryInputProps {
    selected?: boolean
    label: string
    icon: IconType
    onClick: (value: string) => void
}

export function CategoryInput({onClick,icon: Icon,...props}: CategoryInputProps) {
    return (
        <div onClick={() => onClick(props.label)} className={`rounded-xl border-2 py-4 flex flex-col items-center gap-2 hover:border-slate-500 transition cursor-pointer
        ${props.selected ? 'border-slate-500' : 'border-slate-200'}
        `}>
            <Icon size={30}/>
            <div className="font-medium">{props.label}</div>
        </div>
    )
}