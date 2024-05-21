'use client'

import { CartProductType, SelectedImgType } from "@/app/product/[productId]/productDetails"

interface SetColorProps {
    images: SelectedImgType[]
    cartProduct: CartProductType
    handleColorSelect: (value: SelectedImgType) => void
}

export function SetColor({ images, cartProduct, handleColorSelect }: SetColorProps) {
    return (
        <div>
            <div className="flex gap-4 items-center">
                <span className="font-semibold">COR:</span>
                <div className="flex gap-1">
                    {
                        images.map((image) => {
                            return (
                                <div 
                                key={image.color}
                                onClick={() => handleColorSelect(image)}
                                className={`h-7 w-7 rounded-full border-teal-300 flex items-center justify-center 
                                ${cartProduct.selectedImg.color === image.color ? 'border-[1.5px]' : 'border-none'}`}>
                                    <div
                                        style={{ background: image.color }}
                                        className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"
                                    >
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}