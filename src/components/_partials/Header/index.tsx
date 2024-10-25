import { Link } from "react-router-dom"

const Header = ()=>{
    return (
        <div className="bg-white h-full p-4">
            <div className="flex justify-start items-center bg-white gap-2 w-full border ">
                    <Link to="/app" className="py-2 px-4 rounded border">\dashboard</Link>
                    <Link to="/app/categorias" className="py-2 px-4 rounded border">\categorias</Link>
                    <div className="flex w-full justify-end">
                        <Link to="/login" className="py-2 px-4 rounded border bg-red-400 text-white ">\sair</Link>
                    </div>
            </div>
            <h1 className="text-4xl mt-8 font-bold">FINANÇAS PESSOAIS</h1>
        </div>
    )
}

export default Header;