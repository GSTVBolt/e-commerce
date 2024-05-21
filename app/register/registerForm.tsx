'use client'

import { useEffect, useState } from "react"
import { Heading } from "../components/heading"
import { Input } from "../components/inputs/input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../components/button"
import Link from "next/link"
import { AiOutlineGoogle, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import axios from "axios"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SafeUser } from "@/types"

interface RegisterFormProps {
    currentUser: SafeUser | null
}

export function RegisterForm({ currentUser }: RegisterFormProps) {

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

        axios.post('/api/register', data)
            .then(() => {
                toast.success('Conta criada')

                signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false,

                }).then((callback) => {
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
            })
            .catch(() => toast.error('Algo deu errado'))
            .finally(() => {
                setIsLoading(false)
            })
    }

    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    if (currentUser) {
        return <p className="text-center">Logado. Redirecionando...</p>
    }

    return (
        <>
            <Heading title="Inscrever-se para E-Shop" />
            <Button
                outline
                label="Inscrever-se com o Google"
                icon={AiOutlineGoogle}
                onClick={() => signIn('google')}
            />
            <hr className="bg-slate-300 w-full h-px" />
            <Input
                id="name"
                label="Nome"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="confirmPassword"
                label="Senha"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
            <Button
                label={isLoading ? 'Entrando' : 'Inscrever-se'}
                onClick={handleSubmit(onSubmit)}
            />
            <p className="text-sm">
                Já tem uma conta? <Link className="underline" href={'/login'}>
                    Entrar
                </Link>
            </p>
        </>
    )
}