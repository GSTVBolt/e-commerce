import { getCurrentUser } from "@/actions/getCurrentUser";
import { Container } from "../components/container";
import { FormWrap } from "../components/formWrap";
import { RegisterForm } from "./registerForm";

export default async function Register() {

    const currentUser = await getCurrentUser()

    return (
        <Container>
            <FormWrap>
                <RegisterForm currentUser={currentUser}/>
            </FormWrap>
        </Container>
    )
}