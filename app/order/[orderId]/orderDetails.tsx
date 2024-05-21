'use client'

import { Heading } from "@/app/components/heading"
import { Status } from "@/app/components/status"
import { formatPrice } from "@/utils/formatPrice"
import { Order } from "@prisma/client"
import dayjs from "dayjs"
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md"
import { OrderItem } from "./orderItem"
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface OrderDetailsProps {
    order: Order
}

export function OrderDetails({ order }: OrderDetailsProps) {

    return (
        <div className="max-w-[1150px] m-auto flex flex-col gap-2">
            <div className="mt-8">
                <Heading
                    title="Detalhes do Pedido"
                />
            </div>
            <div>Pedido ID: {order.id}</div>
            <div>
                Total: {' '}
                <span className="font-bold">{formatPrice(order.amount)}</span>
            </div>
            <div className="flex gap-2 items-center">
                <div>Status de Entrega:</div>
                <div>
                    {order.deliveryStatus === 'pending' ? (
                        <Status
                            text="pendente"
                            icon={MdAccessTimeFilled}
                            bg="bg-slate-200"
                            color="text-slate-700" />
                    ) : order.deliveryStatus === 'dispatched' ? (
                        <Status
                            text="despachou"
                            icon={MdDeliveryDining}
                            bg="bg-purple-200"
                            color="text-slate-700" />
                    ) : order.deliveryStatus === 'delivered' ? (
                        <Status
                            text="entrege"
                            icon={MdDone}
                            bg="bg-green-200"
                            color="text-slate-700" />
                    ) : <></>}
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <div>Status de Pagamento:</div>
                <div>
                    {order.status === 'pending' ? (
                        <Status
                            text="pendente"
                            icon={MdAccessTimeFilled}
                            bg="bg-slate-200"
                            color="text-slate-700"
                        />) : order.status === 'complete' ?
                        (<Status
                            text="concluído"
                            icon={MdDone}
                            bg="bg-green-200"
                            color="text-green-700"
                        />) : <></>}
                </div>
            </div>
            <div>Data: {dayjs().to(order.createDate)}</div>
            <div>
                <h2 className="font-semibold mt-4 mb-2">Produtos encomendados</h2>
                <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
                    <div className="col-span-2 justify-self-start">PRODUTO</div>
                    <div className="justify-self-center">PREÇO</div>
                    <div className="justify-self-center">QTDE</div>
                    <div className="justify-self-end">TOTAL</div>
                </div>
                {order.products && order.products.map(item => {
                    return <OrderItem key={item.id} item={item}></OrderItem>
                })}
            </div>
        </div>
    )
}