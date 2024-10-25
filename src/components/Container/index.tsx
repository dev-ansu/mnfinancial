import { HTMLAttributes, ReactNode } from "react"

const Container = ({children, className}: ContainerProps)=>{
    className += " w-full p-4 min-h-screen bg-slate-900"
    return(
        <div className={className}> 

            {children}            
        </div>
    )
}

interface ContainerProps extends HTMLAttributes<HTMLDivElement>{
    children: ReactNode;
}

export default Container;
