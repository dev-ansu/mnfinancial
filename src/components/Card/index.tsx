import {  HTMLAttributes, ReactNode } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement>{
    title?: string;
    value?: string | number;
    icon?: ReactNode;
}

const Card = ({value, className, title, icon}: CardProps)=>{
    className += " rounded w-full border p-4";
    return(
        <div className={className}>
            <div className="flex justify-between w-full text-2xl">
                <h2>{title}</h2>
                {icon}
            </div>
            <div className="text-right text-4xl font-bold">
                {value?.toLocaleString('pt-br', {currency:'BRL', style:'currency'})}
            </div>
        </div>
    )
}

export default Card;