interface HeadingProps {
    title: string
    center?: boolean
}

export function Heading({...props}: HeadingProps) {
    return (
        <div className={props.center? 'text-center' : 'text-start'}>
            <h1 className="font-bold text-2xl">{props.title}</h1>
        </div>
    )
}