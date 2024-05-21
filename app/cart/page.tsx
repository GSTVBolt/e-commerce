import { getCurrentUser } from "@/actions/getCurrentUser";
import { Container } from "../components/container";
import { CartClient } from "./cartClient";

export default async function Cart() {

    const currentUser = await getCurrentUser()

    return (
        <div className="pt-8">
            <Container>
                <CartClient currentUser={currentUser}/>
            </Container>
        </div>
    )
}