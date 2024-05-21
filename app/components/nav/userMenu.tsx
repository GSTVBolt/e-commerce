'use client'

import { useCallback, useState } from "react"
import { Avatar } from "../avatar"
import { AiFillCaretDown } from "react-icons/ai"
import Link from "next/link"
import { MenuItem } from "./menuItem"
import { signOut } from "next-auth/react"
import { BackDrop } from "./backDrop"
import { SafeUser } from "@/types"

interface UserMenuProps {
    currentUser: SafeUser | null
}

export function UserMenu({ currentUser }: UserMenuProps) {

    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    return (
        <>
            <div className="relative z-30">
                <div onClick={toggleOpen}
                    className="p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
                >
                    <Avatar src={currentUser?.image}/>
                    <AiFillCaretDown />
                </div>
                {isOpen && (
                    <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
                        {currentUser ? <div>
                            <Link href='/orders'>
                                <MenuItem onClick={toggleOpen}>
                                    Suas Ordens
                                </MenuItem>
                            </Link>
                            <Link href='/admin'>
                                <MenuItem onClick={toggleOpen}>
                                    Painel de Administrador
                                </MenuItem>
                            </Link>
                            <hr />
                            <MenuItem
                                onClick={() => {
                                    toggleOpen();
                                    signOut()
                                }}
                            >
                                Sair
                            </MenuItem>
                        </div> : <div>
                            <Link href='/login'>
                                <MenuItem onClick={toggleOpen}>
                                    Entrar
                                </MenuItem>
                            </Link>
                            <Link href='/register'>
                                <MenuItem onClick={toggleOpen}>
                                    Registrar-se
                                </MenuItem>
                            </Link>
                        </div>}


                    </div>
                )}
            </div>
            {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
        </>
    )
}