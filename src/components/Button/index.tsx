import { ButtonHTMLAttributes, forwardRef } from "react"


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({text, className, ...props}, ref)=>{
    className+= " border rounded p-2"
    return(
        <button  
        ref={ref}
        className={className} {...props}>{text ?? 'Texto padrão'}</button>
    )
});

export default Button;