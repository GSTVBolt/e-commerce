import Link from "next/link";
import { Container } from "../container";
import { FooterList } from "./footerList";
import { MdFacebook } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";

export function Footer() {
    return (
        <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Categorias da Loja</h3>
                        <Link href='#'>
                            Celular
                        </Link>
                        <Link href='#'>
                            Notebooks
                        </Link>
                        <Link href='#'>
                            Desktops
                        </Link>
                        <Link href='#'>
                            Relógios
                        </Link>
                        <Link href='#'>
                            TVs
                        </Link>
                        <Link href='#'>
                            Acessórios
                        </Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Atendimento ao Cliente</h3>
                        <Link href='#'>
                            Contate-nos
                        </Link>
                        <Link href='#'>
                            Política de envio
                        </Link>
                        <Link href='#'>
                            Devoluções & Trocas
                        </Link>
                        <Link href='#'>
                            FAQs
                        </Link>
                    </FooterList>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-base font-bold mb-2">Sobre nós</h3>
                        <p className="mb-2">
                            Na nossa loja de eletrônicos, estamos empenhados em oferecer aos nossos clientes os dispositivos mais avançados e
                            os acessórios mais recentes disponíveis no mercado. Com uma ampla gama de opções que incluem telefones, TVs, notebooks,
                            relógios e acessórios, procuramos sempre proporcionar uma experiência de compra excepcional, garantindo que nossos clientes
                            encontrem exatamente o que procuram.
                        </p>
                        <p>&copy; {new Date().getFullYear()} E-Shop. All rigths reserved</p>
                    </div>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Nos Siga</h3>
                        <div className="flex gap-2">
                            <Link href='#' target="_blank">
                                <MdFacebook size={24}/>
                            </Link>
                            <Link href='#' target="_blank">
                                <BsTwitterX  size={24}/>
                            </Link>
                            <Link href='#' target="_blank">
                                <AiFillInstagram size={24}/>
                            </Link>
                            <Link href='#' target="_blank">
                                <AiFillYoutube size={24}/>
                            </Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
    )
}
