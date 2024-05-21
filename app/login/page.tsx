import { getCurrentUser } from "@/actions/getCurrentUser";
import { Container } from "../components/container";
import { FormWrap } from "../components/formWrap";
import { LoginForm } from "./loginForm";

export default async function Login() {

    const currentUser = await getCurrentUser()

    return (
        <Container>
            <FormWrap>
                <LoginForm currentUser={currentUser}/>
            </FormWrap>
        </Container>
    )
}