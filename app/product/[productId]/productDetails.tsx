'use client'

import { Button } from "@/app/components/button"
import { ProductImage } from "@/app/components/products/productImage"
import { SetColor } from "@/app/components/products/setColor"
import { SetQuantity } from "@/app/components/products/setQuantity"
import { UseCart } from "@/hooks/useCart"
import { Rating } from "@mui/material"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { MdCheckCircle } from "react-icons/md"

interface ProductDetailsProps {
    product: any
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: SelectedImgType,
    quantity: number,
    price: number
}

export type SelectedImgType = {
    color: string,
    colorCode: string,
    image: string
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2" />
}

export default function ProductDetails({ product }: ProductDetailsProps) {

    const { handleAddProductToCart, cartProducts } = UseCart()

    const [isProductInCart, setisProductInCart] = useState(false)

    const [cartProduct, setcardProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: { ...product.images[0] },
        quantity: 1,
        price: product.price,
    })

    const router = useRouter()

    useEffect(() => {
        setisProductInCart(false)

        if (cartProducts) {
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if (existingIndex > -1) {
                setisProductInCart(true)
            }
        }
    }, [cartProducts])

    const numberOfReviews = product.reviews.length

    const productRating = product.reviews.reduce((acc: number, item: any) =>
        item.rating + acc, 0) / numberOfReviews


    const handleColorSelect = useCallback((value: SelectedImgType) => {
        setcardProduct((prev) => {
            return { ...prev, selectedImg: value }
        })
    }, [cartProduct.selectedImg])

    const handleQtyIncrease = useCallback(() => {
        if (cartProduct.quantity === 99) {
            return
        }

        setcardProduct((prev) => {
            return { ...prev, quantity: prev.quantity + 1 }
        })
    }, [cartProduct])

    const handleQtyDecrease = useCallback(() => {
        if (cartProduct.quantity === 1) {
            return
        }

        setcardProduct((prev) => {
            return { ...prev, quantity: prev.quantity - 1 }
        })
    }, [cartProduct])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage
                cartProduct={cartProduct}
                product={product}
                handleColorSelect={handleColorSelect}
            />
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating
                        value={productRating}
                        readOnly
                    />
                    <div>
                        {numberOfReviews} {numberOfReviews == 1 ? 'visualização' : 'visualizações'}
                    </div>
                </div>
                <Horizontal />
                <div className="text-justify">
                    {product.description}
                </div>
                <Horizontal />
                <div>
                    <span className="font-semibold">CATEGORIA:</span> {product.category}
                </div>
                <div>
                    <span className="font-semibold">MARCA:</span> {product.brand}
                </div>
                <div className={product.inStock ? 'text-teal-400' : 'text-rose-400'}>
                    {product.inStock ? 'Em Estoque' : 'Não tem no Estoque'}
                </div>
                <Horizontal />
                {isProductInCart ? (
                    <>
                        <p className="mb-2 text-slate-500 flex items-center gap-1">
                            <MdCheckCircle className="text-teal-400" size={20} />
                            <span>Produto adicionado ao Carrinho</span>
                        </p>
                        <div className="max-w-[300px]">
                            <Button
                                label="Ver Carrinho"
                                onClick={() => router.push('/cart')}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <SetColor
                            cartProduct={cartProduct}
                            images={product.images}
                            handleColorSelect={handleColorSelect}
                        />
                        <Horizontal />
                        <SetQuantity
                            cartProduct={cartProduct}
                            handleQtyIncrease={handleQtyIncrease}
                            handleQtyDecrease={handleQtyDecrease}
                        />
                        <Horizontal />
                        <div className="max-w-[300px]">
                            <Button
                                label="Adicionar ao Carrinho"
                                onClick={() => handleAddProductToCart(cartProduct)}
                            />
                        </div>

                    </>)}

            </div>
        </div>
    )
}