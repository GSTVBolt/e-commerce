'use client'

import { CartProductType } from "@/app/product/[productId]/productDetails"

interface SetQuantityProps {
    cartCounter?: boolean
    cartProduct: CartProductType
    handleQtyIncrease: () => void
    handleQtyDecrease: () => void
}

const btnStyles = 'border-[1.2px] border-slate-300 px-2 rounded'

export function SetQuantity(props: SetQuantityProps) {
    return (
        <div className="flex gap-8 items-center">
            {props.cartCounter ? null : <div className="font-semibold">QUANTIDADE:</div>}
            <div className="flex gap-4 items-center text-base">
                <button onClick={props.handleQtyDecrease} className={btnStyles}>-</button>
                <div>{props.cartProduct.quantity}</div>
                <button onClick={props.handleQtyIncrease} className={btnStyles}>+</button>
            </div>
        </div>
    )
}