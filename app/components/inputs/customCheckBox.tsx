'use client'

import { FieldValues, UseFormRegister } from "react-hook-form"

interface CustomCheckBoxProps {
    id: string
    label: string
    disabled?: boolean
    register: UseFormRegister<FieldValues>
}

export function CustomCheckBox({register, id, ...props }: CustomCheckBoxProps) {
    return (
        <div className="w-full flex flex-row gap-2 items-center">
            <input
                type="checkbox"
                id={id}
                disabled={props.disabled}
                {...register(id)}
                placeholder=""
                className="cursor-pointer"
            />
            <label htmlFor={id} className="font-medium cursor-pointer">{props.label}</label>
        </div>
    )
}