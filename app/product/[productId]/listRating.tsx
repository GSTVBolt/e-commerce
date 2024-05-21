'use client'

import { Avatar } from "@/app/components/avatar"
import { Heading } from "@/app/components/heading"
import { products } from "@/utils/products";
import { Rating } from "@mui/material"
// import moment from "moment"
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface ListRatingProps {
    product: any
}

export function ListRating(props: ListRatingProps) {

    if (props.product.reviews.length === 0) return null

    return (
        <div>
            <Heading
                title="Visualizações do Produto"
            />
            <div className="text-sm mt-2">
                {props.product.reviews && props.product.reviews.map((review: any) => {
                    return (
                        <div
                            key={review.id}
                            className="max-w-[300px]"
                        >
                            <div className="flex gap-2 items-center">
                                <Avatar src={review?.user.image}/>
                                <div className="font-semibold">{review?.user.name}</div>
                                <div className="font-light">{dayjs().to(review.createdDate)}</div>
                            </div>
                            <div className="mt-2">
                                <Rating value={review.rating} readOnly />
                                <div className="ml-2">{review.comment}</div>
                                <hr className="mt-4 mb-4"/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}