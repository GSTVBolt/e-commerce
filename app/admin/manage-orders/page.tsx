import { Container } from "@/app/components/container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NullData } from "@/app/components/nullData";
import { ManageOrdersClient } from "./manageOrdersClient";
import { getOrders } from "@/actions/getOrders";

export default async function ManageOrders() {

  const orders = await getOrders()
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <NullData title="Oops! Acesso negado"/>
}

  return (
    <div className="pt-8">
      <Container>
        <ManageOrdersClient orders = {orders}/>
      </Container>
    </div>
  )
}