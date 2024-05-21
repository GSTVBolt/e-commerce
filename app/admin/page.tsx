import { getProducts } from "@/actions/getProducts";
import { Summary } from "./summary";
import { getOrders } from "@/actions/getOrders";
import { getUsers } from "@/actions/getUsers";
import { Container } from "../components/container";
import { BarGraph } from "./barGraph";
import { getGraphData } from "@/actions/getGraphData";

export default async function Admin() {

    const products = await getProducts({ category: null })
    const orders = await getOrders()
    const users = await getUsers()
    const graphData = await getGraphData()

    return (
        <div className="pt-8">
            <Container>
                <Summary products={products} orders={orders} users={users} />
                <div className="mt-4 mx-auto max-w-[1150px]">
                    <BarGraph data={graphData}/>
                </div>
            </Container>
        </div>
    )
}