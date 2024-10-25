import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Table from "../../components/Table";
import { CategoriaProps, CategoriaSchema } from "../../schemas/CategoriasSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { useRef } from "react";
import { useTransacoesContext } from "../../contexts/TransacoesContext";
import { useAuthContext } from "../../contexts/AuthContext";

export interface CategoriasP extends CategoriaProps{
    id: string;
    uid: string;
    valores?: number;
}

const Categorias = ()=>{
    const {user} = useAuthContext();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const {register, handleSubmit, formState: {errors}, reset} = useForm<CategoriaProps>({
        mode:"all",
        criteriaMode:"all",
        resolver: zodResolver(CategoriaSchema),
    });
    let {categorias, transacoes, handleAddCategoria} = useTransacoesContext();
    categorias = categorias.map( (categoria)=> {
        const valores = transacoes.filter((acc) => acc.categoria_id == categoria.id ? acc.valor:0).reduce((prev, acc) => Number(acc.valor) + prev, 0);
        categoria.valores = valores;
        return categoria;
    })
    console.log(categorias);
    const handleAddCategoriaDb = async(data: CategoriaProps)=>{
        const newData = {...data, uid: user?.uid} as CategoriasP;
        if(buttonRef.current){
            buttonRef.current.textContent = "Carregando...";
        }

        try{
            const docRef = await addDoc(collection(db, 'categorias'), newData);
            toast.success("Categoria inserida com sucesso!");
            if(buttonRef.current){
                buttonRef.current.textContent = "Cadastrar";
            }
            newData.id = docRef.id;
            handleAddCategoria(newData);
            reset();
        }catch(err: any){
            toast.error("Erro ao inserir a categoria.");
            console.log(err);
        }
    }

    return (
        <div className="bg-white p-4">

            <form onSubmit={handleSubmit(handleAddCategoriaDb)} className="w-full">
                <div className="flex flex-col md:flex-row gap-2 justify-around items-center w-full">
                    <label htmlFor="" className="flex-shrink-0 font-bold text-1xl">Descrição da categoria</label>
                    <Input 
                        register={register("descricao")}
                        error={errors.descricao?.message}
                        autoFocus
                        className="w-full"
                        placeholder="Descrição da categoria"
                    />
                    <Button 
                        text="Cadastrar"
                        className="bg-green-400"
                        ref={buttonRef}
                    />
                </div>
            </form>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lgw-full h-full my-8">
                <Table thead={['Descrição', 'Total por categoria']}>
                    {categorias.map(categoria => (
                        <tr key={categoria.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {categoria.descricao}
                            </th>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {categoria.valores?.toLocaleString('pt-br', {currency:"BRL", style:"currency"})}
                            </td>
                        </tr>
                    ))}
                </Table> 
            </div>
            
        </div>
    );
}

export default Categorias;