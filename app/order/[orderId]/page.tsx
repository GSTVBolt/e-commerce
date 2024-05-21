import { Container } from "@/app/components/container"
import { OrderDetails } from "./orderDetails"
import { getOrderById } from "@/actions/getOrderById"
import { NullData } from "@/app/components/nullData"

interface IPrams {
    orderId?: string
}

export default async function Order({params} : {params: IPrams}){

    const order = await getOrderById(params)

    if (!order) return <NullData title="Sem Pedido"></NullData>


    return (
        <div className="p-8">
            <Container>
                <OrderDetails order={order}/>
            </Container>
        </div>
    )
}