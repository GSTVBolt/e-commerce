import { IconType } from "react-icons"
import React from "react"

interface ButtonProps {
    label: string
    disabled?: boolean
    outline?: boolean
    small?: boolean
    custom?: string
    icon?: IconType
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function Button({
    icon: Icon,
    custom,
    onClick,
    ...props }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={props.disabled}
            className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2
        ${props.outline ? 'bg-white' : 'bg-slate-700'}
        ${props.outline ? 'text-slate-700' : 'text-white'}
        ${props.small ? 'text-sm font-light' : 'text-md font-semibold'}
        ${props.small ? 'py-1 px-2 border-[1px]' : 'py-3 px-4 border-2'}
        ${custom ? custom : ''}
        `}
            {...props}>
            {Icon && <Icon size={24} />}
            {props.label}
        </button>
    )
}
