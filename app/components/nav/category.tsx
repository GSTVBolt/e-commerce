'use client'

import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { IconType } from "react-icons"
import queryString from 'query-string'
import { useSearchParams } from "next/dist/client/components/navigation"
import { Suspense } from "react";

interface CategoryProps {
    label: string
    icon: IconType
    selected?: boolean
}

export function Category({ label, icon: Icon, selected }: CategoryProps) {

    const router = useRouter()
    const params = useSearchParams()
    const handleClick = useCallback(() => {

        if (label === 'Todos') {
            router.push('/')
        } else {
            let currentQuery = {}

            if (params) {
                currentQuery = queryString.parse(params.toString())
            }

            const updatedQuery: any = {
                ...currentQuery,
                category: label
            }

            const url = queryString.stringifyUrl(
                {
                    url: '/',
                    query: updatedQuery
                },
                {
                    skipNull: true
                }
            )

            router.push(url)
        }

    }, [label, params, router])

    return (
        <Suspense>
            <div onClick={handleClick} className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer
        ${selected ? 'border-b-slate-800 text-slate-800' : 'border-transparent text-slate-500'}
        `}>
                <Icon size={20} />
                <div className="font-medium text-sm">{label}</div>
            </div>
        </Suspense>
    )
}