import { Container } from "@/app/components/container";
import { FormWrap } from "@/app/components/formWrap";
import { AddProductForm } from "./addProductForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NullData } from "@/app/components/nullData";

export default async function AddProducts() {

    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role !== 'ADMIN') {
        return <NullData title="Oops! Acesso negado"/>
    }

    return (
        <div className="pt-8">
            <Container>
                <FormWrap>
                    <AddProductForm />
                </FormWrap>
            </Container>
        </div>
    )
}