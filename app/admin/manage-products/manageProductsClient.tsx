'use client'

import { Product } from "@prisma/client"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatPrice } from "@/utils/formatPrice";
import { ptPT } from '@mui/x-data-grid/locales';
import { Heading } from "@/app/components/heading";
import { Status } from "@/app/components/status";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import { ActionBtn } from "@/app/components/actionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
interface ManageProductsClientProps {
    products: Product[]
}

export function ManageProductsClient({ products }: ManageProductsClientProps) {

    const router = useRouter()
    const storage = getStorage(firebaseApp)

    let rows: any = []

    if (products) {
        rows = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: formatPrice(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                images: product.images
            }
        })
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'name', headerName: 'Nome', width: 220 },
        {
            field: 'price', headerName: 'Preço(BRL)', width: 100, renderCell: (params) => {
                return (<div className="font-bold text-slate-800">{params.row.price}</div>)
            }
        },
        { field: 'category', headerName: 'Categoria', width: 100 },
        { field: 'brand', headerName: 'Marca', width: 100 },
        {
            field: 'inStock', headerName: 'Em Estoque', width: 120, renderCell: (params) => {
                return (
                    <div className="mt-3">{params.row.inStock === true ? (<Status
                        text="em estoque"
                        icon={MdDone}
                        bg="bg-teal-200"
                        color="text-teal-700"
                    />
                    ) : (
                        <Status
                            text="indisponível"
                            icon={MdClose}
                            bg="bg-rose-200"
                            color="text-rose-700"
                        />
                    )}
                    </div>
                )
            }
        },
        {
            field: 'action', headerName: 'Ações', width: 200, renderCell: (params) => {
                return (
                    <div className="flex justify-between gap-4 w-full mt-3">
                        <ActionBtn
                            icon={MdCached}
                            onClick={() => handleToggleStock(params.row.id, params.row.inStock)}
                        />
                        <ActionBtn
                            icon={MdDelete}
                            onClick={() => handleDelete(params.row.id, params.row.images)}
                        />
                        <ActionBtn
                            icon={MdRemoveRedEye}
                            onClick={() => router.push(`product/${params.row.id}`)}
                        />
                    </div>)
            }
        },
        // Considerando que 'images' é um array, você pode precisar de um componente customizado para exibir as imagens
        // { field: 'images', headerName: 'Imagens', width: 200, ... }, 
    ];

    const handleToggleStock = useCallback((id: string, inStock: boolean) => {
        axios.put('/api/product', {
            id,
            inStock: !inStock
        }).then((res) => {
            toast.success('Status do Produto alterado')
            router.refresh()
        }).catch((err) => {
            toast.error('Oops! Algo deu errado')
            console.log(err)
        })
    }, [])

    const handleDelete = useCallback(async (id: string, images: any[]) => {
        toast('Deletando produto, por favor espere')

        const handleImageDelete = async () => {
            try {
                for (const item of images) {
                    if (item.image) {
                        const imageRef = ref(storage, item.image)
                        await deleteObject(imageRef)
                        console.log('imagem deletada', item.image)
                    }
                }
            } catch (error) {
                return console.log('Erro ao deletar imagens', error)
            }
        }

        await handleImageDelete()

        axios.delete(`/api/product/${id}`).then((res) => {
            toast.success('Produto deletado')
            router.refresh()
        }).catch((err) => {
            toast.error('Oops! Algo deu errado')
            console.log(err)
        })
    }, [])

    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading
                    title="Gerenciar Produtos"
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