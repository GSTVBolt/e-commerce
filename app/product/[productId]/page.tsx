import { Container } from "@/app/components/container"
import ProductDetails from "./productDetails"
import { ListRating } from "./listRating"
import getProductById from "@/actions/getProductsById"
import { NullData } from "@/app/components/nullData"
import { AddRating } from "./addRating"
import { getCurrentUser } from "@/actions/getCurrentUser"

interface IPrams {
    productId?: string
}

export default async function Product({ params }: { params: IPrams }) {

    const product = await getProductById(params)
    const user = await getCurrentUser()

    if (!product) return <NullData title="Oops! O produto com o ID fornecido não existe" />

    return (
        <div className="p-8">
            <Container>
                <ProductDetails product={product} />
                <div className="flex flex-col mt-20 gap-4">
                    <AddRating product={product} user={user}/>
                    <ListRating product={product} />
                </div>
            </Container>
        </div>
    )
}