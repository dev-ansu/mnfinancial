import { ButtonHTMLAttributes } from "react"


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text?: string;
}

const Button = ({text, className, ...props}: ButtonProps)=>{
    className+= " border rounded p-2"
    return(
        <button className={className} {...props}>{text ?? 'Texto padrão'}</button>
    )
}

export default Button;