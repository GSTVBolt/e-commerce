'use client'

import { UseCart } from "@/hooks/useCart"
import Link from "next/link"
import { MdArrowBack } from "react-icons/md"
import { Heading } from "../components/heading"
import { Button } from "../components/button"
import { ItemContent } from "./itemContent"
import { formatPrice } from "@/utils/formatPrice"
import { SafeUser } from "@/types"
import { useRouter } from "next/navigation"

interface CartClientProps {
    currentUser: SafeUser | null
}

export function CartClient({ currentUser }: CartClientProps) {

    const router = useRouter()

    const { cartProducts, handleClearCart, cartTotalAmount } = UseCart()

    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Seu carrinho está vazio</div>
                <div>
                    <Link href={'/'} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>Começar a comprar</span>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Heading title="Carrinho de Compras" center />
            <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-10">
                <div className="col-span-2 justify-self-start">PRODUTO</div>
                <div className="justify-self-center">PREÇO</div>
                <div className="justify-self-center">QUANTIDADE</div>
                <div className="justify-self-end pr-3">TOTAL</div>
            </div>
            <div>
                {cartProducts && cartProducts.map((item) => {
                    return (
                        <ItemContent key={item.id} item={item} />
                    )
                })}
            </div>
            <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
                <div className="max-w-[140px]">
                    <Button
                        label="Limpar Carrinho"
                        onClick={() => handleClearCart()}
                        small
                        outline
                    />
                </div>
                <div className="text-sm flex flex-col gap-1 items-start">
                    <div className="flex justify-between w-full text-base font-semibold">
                        <span>Subtotal</span>
                        <span>{formatPrice(cartTotalAmount)}</span>
                    </div>
                    <p className="text-slate-500">Impostos e frete calculados na finalização da compra</p>
                    <Button
                        label={currentUser ? 'Conferir' : 'Conecte-se para Conferir'}
                        outline={currentUser ? false : true}
                        onClick={() => { currentUser ? router.push('/checkout') : router.push('/login') }}
                    />
                    <Link href={'/'} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>Continuar a comprar</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}