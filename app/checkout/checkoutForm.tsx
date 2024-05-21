'use client'

import { UseCart } from "@/hooks/useCart"
import { formatPrice } from "@/utils/formatPrice"
import { useStripe, useElements, PaymentElement, AddressElement } from "@stripe/react-stripe-js"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Heading } from "../components/heading"
import { Button } from "../components/button"

interface CheckoutFormProps {
    clientSecret: string
    handleSetPaymentSuccess: (value: boolean) => void
}

export function CheckoutForm({ clientSecret, handleSetPaymentSuccess }: CheckoutFormProps) {

    const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } = UseCart()
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const formattedPrice = formatPrice(cartTotalAmount)

    useEffect(() => {
        if (!stripe) {
            return
        }
        if (!clientSecret) {
            return
        }
        handleSetPaymentSuccess(false)
    }, [stripe])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsLoading(true)

        stripe.confirmPayment({
            elements, redirect: 'if_required',
        })
            .then((result) => {
                if (!result.error) {
                    toast.success('Pagamento Confirmado')

                    handleClearCart()
                    handleSetPaymentSuccess(true)
                    handleSetPaymentIntent(null)
                }

                setIsLoading(false)
            })
    }

    return (
        <form onSubmit={handleSubmit} id="payment-form">
            <div className="mb-6">
                <Heading title="Insira seus detalhes de pagamento para concluir a compra " />
            </div>
            <h2 className="font-semibold mb-2">Informações de Endereço</h2>
            <AddressElement options={{ mode: 'shipping', allowedCountries: ['BR', 'US'] }} />
            <h2 className="font-semibold mt-4 mb-2">Informações de Pagamento</h2>
            <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
            <div className="py-4 text-center text-slate-700 text-xl font-bold">
                Total: {formattedPrice}
            </div>
            <Button
                label={isLoading ? 'Processando' : 'Pagar agora'}
                disabled={isLoading || !stripe || !elements}
                onClick={() => { }}
            />
        </form>
    )
}