import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { RegistroProps, RegistroSchema } from "../../schemas/RegistroSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import TransacoesTable from "../../components/TransacoesTable";
import ResumoDashboard from "../../components/ResumoDashboard";
import { useTransacoesContext } from "../../contexts/TransacoesContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { MouseEvent, useState } from "react";


export interface TransacoesProps extends RegistroProps{
    uid?: string;
    id: string;
    categoria_id: string;
}

const Home = ()=>{
    const {user} = useAuthContext();
    const {handleAddTransaction, categorias} = useTransacoesContext();
    const [tipoValor, setTipoValor] = useState(false);

    const {handleSubmit, formState:{errors}, register, reset} = useForm<RegistroProps>({
        mode:'all',
        criteriaMode:'all',
        resolver: zodResolver(RegistroSchema),
    });
  
    
    const insert = async (data: RegistroProps)=>{
        try{
            
            if(!categorias.some((categoria)=> categoria.id == data.categoria_id)){
                toast.error("Escolha uma categoria válida.")
                return;
            }
            const newData = {uid: user?.uid, ...data} as TransacoesProps;
            const docRef = await addDoc(collection(db, 'transacoes'), newData);
            if(data.tipoValor == 'S'){
                toast.success("Nova despesa inserida.");
            }else{
                toast.success("Nova entrada inserida.");
            }
            setTipoValor(false);
            newData.id = docRef.id;
            handleAddTransaction(newData);
            reset();
        }catch(err: any){
            toast.error("Erro ao inserir a despesa.");
            console.log(err);
        }
    }
    const handleClick = (e: MouseEvent<HTMLElement>)=>{
        const event = e.target as HTMLInputElement;
        if(event.value === 'S'){
            setTipoValor(true);
        }else{
            setTipoValor(false);
        }
    }
    return(
        <div className="w-full p-4 bg-white">
            
            <ResumoDashboard />    

            <form onSubmit={handleSubmit(insert)} className="my-4 lg:flex gap-2 w-full md:justify-around md:items-center">
                <div className="form-group w-full">
                    <label htmlFor="">Descrição</label>
                    <Input register={register('descricao')} error={errors.descricao?.message}  placeholder="Digite a descrição" />
                </div>
                <div className="form-group w-full">
                    <label htmlFor="">Valor</label>
                    <Input
                    register={register('valor')} error={errors.valor?.message} placeholder="Digite o valor" />
                </div>
                <div className="form-group w-full">
                    <label htmlFor="">Data da transação</label>
                    <Input
                    type="date" 
                    register={register('data_transacao')} error={errors.data_transacao?.message} placeholder="Escolha uma data" />
                </div>
                <div className="flex mt-2 md:mt-0 form-group md:px-6 gap-4">
                    <div>
                        <label htmlFor="entrada">Entrada</label>
                        <Input onClick={handleClick} id="entrada" register={register('tipoValor')} error={errors.tipoValor?.message} name="tipo_valor" type="radio" value="E" />
                    </div>
                    <div>
                        <label htmlFor="saida">Saída</label>
                        <Input onClick={handleClick} id="saida" name="tipo_valor" register={register('tipoValor')} error={errors.tipoValor?.message} type="radio" value='S' />
                    </div>
                </div>
                {tipoValor &&
                <div className="form-group w-full">
                    <label htmlFor="">Categoria</label>
                        <select id="" {...register("categoria_id")} className="w-full p-2 border-2 outline-none focus:border-2 transition-all rounded-md focus:border-slate-900">
                        {categorias.map( categoria => (
                            <option key={categoria.id} value={categoria.id}>{categoria.descricao}</option>
                        ))}
                    </select>
                    {errors.categoria_id?.message && <span className="p-1 bg-red-300 rounded flex justify-between">
                        {errors.categoria_id?.message}
                    </span>}
                </div>
                }
                <Button 
                    className="mt-4 md:mt-0 bg-green-400"
                    text="ADICIONAR"
                />
            </form>
                <TransacoesTable />
        </div>
    )
}

export default Home;