'use client'

import { categories } from "@/utils/categories";
import { Container } from "../container";
import { Category } from "./category";
import { usePathname, useSearchParams } from "next/dist/client/components/navigation";

export function Categories() {

    const params = useSearchParams()

    const category = params?.get('category')

    const pathName = usePathname()

    const isMainPage = pathName === '/'

    if (!isMainPage) return null

    return (
        <div className="bg-white">
            <Container>
                <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                    {categories.map((item) => (
                       <Category 
                       key={item.label}
                       label={item.label}
                       icon={item.icon}
                       selected={category === item.label || (category === null && item.label === 'Todos')}
                       />
                    ))}
                </div>
            </Container>
        </div>
    )
}