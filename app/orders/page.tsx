import { Container } from "@/app/components/container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NullData } from "@/app/components/nullData";
import { getOrdersByUserId } from "@/actions/getOrdersByUserId";
import { OrdersClient } from "./ordersClient";

export default async function Orders() {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return <NullData title="Oops! Acesso negado" />
    }

    const orders = await getOrdersByUserId(currentUser.id)

    if (!orders) {
        return <NullData title="Ainda não há pedidos..." />
    }

    return (
        <div className="pt-8">
            <Container>
                <OrdersClient orders={orders} />
            </Container>
        </div>
    )
}