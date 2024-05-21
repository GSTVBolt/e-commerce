'use client'

import { Order, User } from "@prisma/client"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatPrice } from "@/utils/formatPrice";
import { ptPT } from '@mui/x-data-grid/locales';
import { Heading } from "@/app/components/heading";
import { Status } from "@/app/components/status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import { ActionBtn } from "@/app/components/actionBtn";
import { useRouter } from "next/navigation";
import moment from "moment";
import 'moment/locale/pt-br'
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface OrdersClientProps {
    orders: ExtendedOrder[]
}

type ExtendedOrder = Order & {
    user: User
}

export function OrdersClient({ orders }: OrdersClientProps) {

    const router = useRouter()

    let rows: any = []

    if (orders) {
        rows = orders.map((order) => {
            return {
                id: order.id,
                customer: order.user.name,
                amount: formatPrice(order.amount / 100),
                paymentSatus: order.status,
                // date: moment(order.createDate).locale('pt-br').fromNow(),
                date: dayjs().to(order.createDate),
                deliveryStatus: order.deliveryStatus,
            }
        })
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'customer', headerName: 'Nome do Cliente', width: 130 },
        {
            field: 'amount', headerName: 'Quantidade(BRL)', width: 130, renderCell: (params) => {
                return (<div className="font-bold text-slate-800">{params.row.amount}</div>)
            }
        },
        {
            field: 'paymentSatus', headerName: 'Status de Pagamento', width: 130, renderCell: (params) => {
                return (
                    <div className="mt-3">{params.row.paymentSatus === 'pending' ? (
                        <Status
                            text="pendente"
                            icon={MdAccessTimeFilled}
                            bg="bg-slate-200"
                            color="text-slate-700"
                        />
                    ) : params.row.paymentSatus === 'complete' ? (
                        <Status
                            text="concluído"
                            icon={MdDone}
                            bg="bg-green-200"
                            color="text-slate-700"
                        />
                    ) : <></>}
                    </div>
                )
            }
        },
        {
            field: 'deliveryStatus', headerName: 'Status de Entrega', width: 130, renderCell: (params) => {
                return (
                    <div className="mt-3">{params.row.deliveryStatus === 'pending' ? (
                    <Status
                        text="pendente"
                        icon={MdAccessTimeFilled}
                        bg="bg-slate-200"
                        color="text-slate-700"
                    />
                    ) : params.row.deliveryStatus === 'dispatched' ? (
                        <Status
                            text="despachou"
                            icon={MdDeliveryDining}
                            bg="bg-purple-200"
                            color="text-slate-700"
                        />
                    ) : params.row.deliveryStatus === 'delivered' ? (
                        <Status
                            text="entregue"
                            icon={MdDone}
                            bg="bg-green-200"
                            color="text-slate-700"
                        />
                    ) : <></>}
                    </div>
                )
            }
        },
        { field: 'date', headerName: 'Data', width: 130 },
        {
            field: 'action', headerName: 'Ações', width: 200, renderCell: (params) => {
                return (
                    <div className="flex justify-between gap-4 w-full mt-3">
                        <ActionBtn
                            icon={MdRemoveRedEye}
                            onClick={() => router.push(`/order/${params.row.id}`)}
                        />
                    </div>)
            }
        },
        // Considerando que 'images' é um array, você pode precisar de um componente customizado para exibir as imagens
        // { field: 'images', headerName: 'Imagens', width: 200, ... }, 
    ];

    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading
                    title="Gerenciar Pedidos"
                />
            </div>
            <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                    localeText={ptPT.components.MuiDataGrid.defaultProps.localeText}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 9 },
                        },
                    }}
                    pageSizeOptions={[9, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    )
}