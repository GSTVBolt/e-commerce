import { Container } from "../components/container";
import { FormWrap } from "../components/formWrap";
import { CheckoutClient } from "./checkoutClient";

export default function Checkout() {
    return (
        <div className="p-8">
            <Container>
                <FormWrap>
                    <CheckoutClient/>
                </FormWrap>
            </Container>
        </div>
    )
}