'use client'

import { useState } from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps {
    id: string
    label?: string
    type?: string
    disabled?: boolean
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    onChange?: (isChecked: boolean) => void
}

export function Input({ required, onChange, ...props }: InputProps) {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);

        if (onChange) {
            onChange(!showPassword);
        }
    };

    return (
        <div className="w-full relative">
            <input
                autoComplete="on"
                id={props.id}
                disabled={props.disabled}
                placeholder=""
                type={props.type === "password" ? (showPassword ? "text" : "password") : props.type}
                {...props.register(props.id, { required })}
                className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed
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
            {props.type === "password" && (
                <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                    {showPassword ? (
                        <AiOutlineEye className="text-gray-500" size={30}/>
                    ) : (
                        <AiOutlineEyeInvisible className="text-gray-500" size={30}/>
                    )}
                </span>
            )}
        </div>
    )
}