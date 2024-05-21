'use client'

import { Button } from "@/app/components/button"
import { Heading } from "@/app/components/heading"
import { CategoryInput } from "@/app/components/inputs/categoryInput"
import { CustomCheckBox } from "@/app/components/inputs/customCheckBox"
import { Input } from "@/app/components/inputs/input"
import { SelectColor } from "@/app/components/inputs/selectColor"
import { TextArea } from "@/app/components/inputs/textArea"
import firebaseApp from "@/libs/firebase"
import { categories } from "@/utils/categories"
import { colors } from "@/utils/colors"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import axios from "axios"
import { useRouter } from "next/navigation"

export type ImageType = {
    color: string
    colorCode: string
    image: File | null
}

export type UploadedImageType = {
    color: string
    colorCode: string
    image: string
}

export function AddProductForm() {

    const router = useRouter()

    const [isLoading, setisLoading] = useState(false)
    const [images, setImages] = useState<ImageType[] | null>()
    const [isProductCreated, setIsProductCreated] = useState(false)

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            price: '',
            brand: '',
            category: '',
            inStock: false,
            images: [],
        }
    })

    useEffect(() => {
        setCustomValue('images', images)
    }, [images])

    useEffect(() => {
        if (isProductCreated) {
            reset()
            setImages(null)
            setIsProductCreated(false)
        }
    }, [isProductCreated])

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log('produto', data)

        // upload images to firebase
        // save product to mongodb
        setisLoading(true)
        let uploadedImages: UploadedImageType[] = []

        if (!data.category) {
            setisLoading(false)
            return toast.error('Categoria não selecionada!')
        }

        if (!data.images || data.images.length === 0) {
            setisLoading(false)
            return toast.error('Imagem não selecionada!')
        }

        const handleImageUploads = async () => {
            toast('Criando produto, por favor espere...')
            try {
                for (const item of data.images) {
                    if (item.image) {
                        const fileName = new Date().getTime() + '-' + item.image.name
                        const storage = getStorage(firebaseApp)
                        const storageRef = ref(storage, `products/${fileName}`)
                        const uploadTask = uploadBytesResumable(storageRef, item.image)

                        await new Promise<void>((resolve, reject) => {
                            uploadTask.on(
                                'state_changed',
                                (snapshot) => {
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                    console.log('Upload ' + progress + '% done')
                                    switch (snapshot.state) {
                                        case 'paused':
                                            console.log('Upload foi pausado')
                                            break
                                        case 'running':
                                            console.log('Upload está em execução')
                                            break
                                    }
                                },
                                (error) => {
                                    console.log('Erro ao fazer upload da imagem', error)
                                    reject(error)
                                },
                                () => {
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                        uploadedImages.push({
                                            ...item,
                                            image: downloadURL
                                        })
                                        console.log('Arquivo disponível em', downloadURL)
                                        resolve()
                                    }).catch((error) => {
                                        console.log('Erro ao obter a URL do dowload')
                                        reject(error)
                                    })
                                }
                            )
                        })
                    }
                }
            } catch (error) {
                setisLoading(false)
                console.log('Erro ao entregar upload de imagens', error)
                return toast.error('Erro ao entregar upload de imagens')
            }
        }

        await handleImageUploads()
        const productData = { ...data, images: uploadedImages }

        axios.post('/api/product', productData).then(() => {
            toast.success('Produto Criado')
            setIsProductCreated(true)
            router.refresh()
        }).catch((error) => {
            toast.error('Algo deu errado ao salvar o produto no banco de dados')
        }).finally(() => {
            setisLoading(false)
        })

    }

    const category = watch('category')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (!prev) {
                return [value]
            }

            return [...prev, value]
        })
    }, [])

    const removeImageFromState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (prev) {
                const filteredImages = prev.filter((item) => item.color !== value.color)

                return filteredImages
            }

            return prev
        })
    }, [])

    return (
        <>
            <Heading
                title="Adicionar um Produto"
                center
            />
            <Input
                id="name"
                label="Nome"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="price"
                label="Preço"
                disabled={isLoading}
                register={register}
                errors={errors}
                type="number"
                required
            />
            <Input
                id="brand"
                label="Marca"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <TextArea
                id="description"
                label="Descrição"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <CustomCheckBox
                id="inStock"
                register={register}
                label="Este produto está em estoque"
            />
            <div className="w-full font-medium">
                <div className="mb-2 font-semibold">Selecione uma Categoria</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
                    {categories.map((item) => {
                        if (item.label === 'Todos') {
                            return null
                        }

                        return (
                            <div key={item.label} className="col-span">
                                <CategoryInput
                                    onClick={(category) => setCustomValue('category', category)}
                                    selected={category === item.label}
                                    label={item.label}
                                    icon={item.icon}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="w-full flex flex-col flex-wrap gap-4">
                <div>
                    <div className="font-bold">
                        Selecione as cores dos produtos disponíveis e carregue suas imagens
                    </div>
                    <div className="text-sm">
                        Você deve enviar uma imagem para cada cor selecionada, caso contrário sua seleção de cores será ignorada
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {colors.map((item, index) => {
                        return <SelectColor
                            key={index}
                            item={item}
                            addImageToState={addImageToState}
                            removeImageFromState={removeImageFromState}
                            isProductCreated={isProductCreated}
                        />
                    })}
                </div>
            </div>
            <Button
                label={isLoading ? 'Carregando...' : 'Adicionar Produto'}
                onClick={handleSubmit(onSubmit)}
            />
        </>
    )
}