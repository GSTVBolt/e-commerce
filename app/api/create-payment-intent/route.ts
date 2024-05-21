import Stripe from "stripe"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"
import { CartProductType } from "@/app/product/[productId]/productDetails"
import { getCurrentUser } from "@/actions/getCurrentUser"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-04-10'
})

const calculateOrderAmount = (items: CartProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity

        return acc + itemTotal
    }, 0)

    const price: any = totalPrice.toFixed(2) //Math.floor(totalPrice)

    return price
}

export async function POST(req: Request) {
    const currntUser = await getCurrentUser()

    if (!currntUser) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await req.json()
    const { items, payment_intent_id } = body
    const total = calculateOrderAmount(items) * 100
    const orderData = {
        user: { connect: { id: currntUser.id } },
        amount: total,
        currency: 'brl',
        status: 'pending',
        deliveryStatus: 'pending',
        paymentIntentId: payment_intent_id,
        products: items
    }

    if (payment_intent_id) {

        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)

        if (current_intent) {
            const updated_intent = await stripe.paymentIntents.update(
                payment_intent_id, {
                amount: total
            }

            )

            // update the order

            const [existing_order, update_order] = await Promise.all([
                prisma.order.findFirst({
                    where: { paymentIntentId: payment_intent_id }
                }),
                prisma.order.update({
                    where: { paymentIntentId: payment_intent_id },
                    data: {
                        amount: total,
                        products: items
                    }
                })
            ])

            if (!existing_order) {
                return NextResponse.json({ error: 'Intenção de Pagamento Ínvalida' }, {
                    status: 400
                })
            }

            return NextResponse.json({ paymentIntent: updated_intent })
        }
    } else {
        // create the intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'brl',
            automatic_payment_methods: { enabled: true }
        })

        // create the order

        orderData.paymentIntentId = paymentIntent.id

        await prisma.order.create({
            data: orderData
        })

        return NextResponse.json({ paymentIntent })
    }
}