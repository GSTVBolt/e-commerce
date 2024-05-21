'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface TextAreaProps {
    id: string
    label?: string
    disabled?: boolean
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}

export function TextArea({ required, ...props }: TextAreaProps) {

    return (
        <div className="w-full relative">
            <textarea
                id={props.id}
                disabled={props.disabled}
                placeholder=""
                {...props.register(props.id, { required })}
                className={`peer w-full p-4 pt-6 max-h-[150px] min-h-[150px] outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed
                ${props.errors[props.id] ? 'border-rose-400' : 'border-slate-300'}
                ${props.errors[props.id] ? 'focus:border-rose-400' : 'focus:border-slate-300'}
            `} />
            <label htmlFor={props.id}
                className={`absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
                ${props.errors[props.id] ? 'text-rose-500' : 'text-slate-400'}
                `}
            >
                {props.label}
            </label>
        </div>
    )
}