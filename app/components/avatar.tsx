import Image from "next/image"
import { FaUserCircle } from "react-icons/fa"

interface AvatarProps {
    src?: string | null | undefined
}

export function Avatar(props: AvatarProps) {
    if (props.src) {
        return (
            <Image
                src={props.src}
                alt="Avatar"
                className="rounded-full"
                height={30}
                width={30}
            />
        )
    }

    return (
        <FaUserCircle size={24} />
    )
}