import { IconType } from "react-icons"

interface StatusProps {
    text: string
    icon: IconType
    bg: string
    color: string
}

export function Status({ text,
    icon: Icon,
    bg,
    color }: StatusProps) {
    return (
        <div className={`
        ${bg}
        ${color && 'h-6'}
        px-1 rounded flex items-center gap-1
        `}>
            {text} <Icon size={15} />
        </div>
    )
}