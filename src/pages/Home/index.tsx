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


export interface TransacoesProps extends RegistroProps{
    uid?: string;
    id: string;
}

const Home = ()=>{
    const {user} = useAuthContext();
    const {handleAddTransaction} = useTransacoesContext();
    

    const {handleSubmit, formState:{errors}, register, reset} = useForm<RegistroProps>({
        mode:'all',
        criteriaMode:'all',
        resolver: zodResolver(RegistroSchema),
    });
  
    
    const insert = async (data: RegistroProps)=>{
        try{
            const newData = {uid: user?.uid, ...data} as TransacoesProps;
            await addDoc(collection(db, 'transacoes'), newData);
            if(data.tipoValor == 'S'){
                toast.success("Nova despesa inserida.");
            }else{
                toast.success("Nova entrada inserida.");
            }
            handleAddTransaction(newData);
            reset();
        }catch(err: any){
            toast.error("Erro ao inserir a despesa.");
            console.log(err);
        }
    }

    return(
        <div className="w-full p-4 bg-white">
            
            <ResumoDashboard />    

            <form onSubmit={handleSubmit(insert)} className="my-4 md:flex gap-2 w-full md:justify-around md:items-center">
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
                        <Input id="entrada" register={register('tipoValor')} error={errors.tipoValor?.message} name="tipo_valor" type="radio" value="E" />
                    </div>
                    <div>
                        <label htmlFor="saida">Saída</label>
                        <Input id="saida" name="tipo_valor" register={register('tipoValor')} error={errors.tipoValor?.message} type="radio" value='S' />
                    </div>
                </div>
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