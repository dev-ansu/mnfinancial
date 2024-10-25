import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    register?: UseFormRegisterReturn;
    error?: string;
}

const Input = ({register, error, className, ...props}: InputProps)=>{
    className += " p-2 border-2 outline-none focus:border-2 transition-all rounded-md focus:border-slate-900"
    return(
        <div className="flex flex-col gap-1 w-full">
            <input className={className} {...props} {...register} />
            {error && <span className="p-1 bg-red-300 rounded flex justify-between">
                {error}
            </span>}
        </div>
        
    )
}

export default Input;