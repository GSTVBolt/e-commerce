'use client'

import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { UseCart } from "@/hooks/useCart"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { CheckoutForm } from "./checkoutForm"
import { Button } from "../components/button"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export function CheckoutClient() {

    const router = useRouter()

    const { cartProducts, paymentIntent, handleSetPaymentIntent } = UseCart()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret, setclientSecret] = useState('')
    const [paymentSuccess, setpaymentSuccess] = useState(false)

    useEffect(() => {
        // create a paymentintent as soon as the page loads
        if (cartProducts) {
            setLoading(true)
            setError(false)

            fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent,
                })
            }).then((res) => {
                setLoading(false)
                if (res.status === 401) {
                    return router.push('/login')
                }

                return res.json()
            }).then((data) => {
                setclientSecret(data.paymentIntent.client_secret)
                handleSetPaymentIntent(data.paymentIntent.id)
            }).catch((error) => {
                setError(true)
                console.log('Erro', error)
                toast.error('Algo deu errado')
            })
        }

    }, [cartProducts, paymentIntent])

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            labels: 'floating'
        },
    }

    const handleSetPaymentSuccess = useCallback((value: boolean) => {
        setpaymentSuccess(value)
    }, [])

    return (
        <div className="w-full">
            {clientSecret && cartProducts && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm
                        clientSecret={clientSecret}
                        handleSetPaymentSuccess={handleSetPaymentSuccess}
                    />
                </Elements>
            )}
            {loading && <div className="text-center">Carregando...</div>}
            {error && <div className="text-center text-rose-500">Algo deu errado...</div>}
            {paymentSuccess && <div className="flex items-center flex-col gap-4">
                <div className="text-teal-500 text-center">Pagamento feito com Sucesso</div>
                <div className="max-w-[220px] w-full">
                    <Button label="Visualizar seus pedidos" onClick={() => router.push('/orders')}/>
                </div>
            </div>}
        </div>
    )
}