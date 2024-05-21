import { AiOutlineDesktop, AiOutlineLaptop } from "react-icons/ai";
import { MdOutlineKeyboard, MdOutlinePhoneAndroid, MdStorefront, MdTv, MdWatch } from "react-icons/md";

export const categories = [
    {
        label: 'Todos',
        icon: MdStorefront
    },
    {
        label: 'Celular',
        icon: MdOutlinePhoneAndroid 
    },
    {
        label: 'Laptop',
        icon: AiOutlineLaptop
    },
    {
        label: 'Desktop',
        icon: AiOutlineDesktop
    },
    {
        label: 'Relógio',
        icon: MdWatch
    },
    {
        label: 'TV',
        icon: MdTv
    },
    {
        label: 'Acessórios',
        icon: MdOutlineKeyboard
    },
]