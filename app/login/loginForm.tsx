'use client'

import { useEffect, useState } from "react"
import { Heading } from "../components/heading"
import { Input } from "../components/inputs/input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../components/button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { SafeUser } from "@/types"

interface LoginFormProps {
    currentUser: SafeUser | null
}

export function LoginForm({currentUser}: LoginFormProps) {

    const regexName = /^[a-zA-Z]+$/
    const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    const regexSenha = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/

    const router = useRouter()

    useEffect(() => {
        if (currentUser) {
            router.push('/cart')
            router.refresh()
        }
    }, [])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false)

            if (callback?.ok) {
                router.push('/cart')
                router.refresh()

                toast.success('Logado')
            }
            console.log(data)
            if (callback?.error) {
                toast.error(callback.error)
            }
        })
    }

    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    if (currentUser) {
        return <p className="text-center">Logado. Redirecionando...</p>
    }

    return (
        <>
            <Heading title="Conectar-se para E-Shop" />
            <Button
                outline
                label="Continuar com o Google"
                icon={AiOutlineGoogle}
                onClick={() => signIn('google')}
            />
            <hr className="bg-slate-300 w-full h-px" />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Senha"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
            <Button
                label={isLoading ? 'Entrando' : 'Entrar'}
                onClick={handleSubmit(onSubmit)}
            />
            <p className="text-sm">
                Não possui uma conta? <Link className="underline" href={'/register'}>
                    Inscrever-se
                </Link>
            </p>
        </>
    )
}