import {createContext, useContext, ReactNode, useState, useEffect, SetStateAction, Dispatch} from "react"
import { TransacoesProps } from "../pages/Home";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebaseConnection";
import { useAuthContext } from "./AuthContext";


type TransacoesData = {
    endDate: string;
    startDate: string;
    setEndDate: Dispatch<SetStateAction<string>>;
    setStartDate: Dispatch<SetStateAction<string>>;
    transacoes: TransacoesProps[];
    handleAddTransaction: ({id, data_transacao,descricao,tipoValor,valor}: TransacoesProps) => void;
}

const TransacoesContext = createContext({} as TransacoesData);

interface TransacoesProviderProps{
    children: ReactNode;
}

export const TransacoesProvider = ({children}:TransacoesProviderProps)=>{
    const {user} = useAuthContext();
    const [transacoes, setTransacoes] = useState<TransacoesProps[] | null>(null);
    const date = new Date();
    const [startDate, setStartDate] = useState(`${date.getFullYear()}-${date.getMonth() <= 9 ? "0"+ date.getMonth():date.getMonth()}-01`);
    const [endDate, setEndDate] = useState((new Date).toLocaleDateString('pt-br').split('/').reverse().join("-"));

    useEffect(()=>{
        const loadTransacoes = async()=>{
            const q = query(collection(db, "transacoes"),
                where("data", ">=", startDate),
                where("data", "<=", endDate),
                where("uid", ">=", user?.uid),
            )
            const querySnapshot = await getDocs(q);
            const transacoesList = [] as TransacoesProps[];
            querySnapshot.forEach((doc) => {
                const transacao = {
                    id: doc.id,
                    uid: doc.data().uid,
                    valor: doc.data().valor,
                    data_transacao: doc.data().data_transacao,
                    descricao: doc.data().descricao,
                    tipoValor: doc.data().tipoValor,
                } as TransacoesProps;
                transacoesList.push(transacao);
            });
            setTransacoes(transacoesList);
        }

        loadTransacoes();
    },[startDate, endDate])

    const handleAddTransaction = ({id,uid, data_transacao,descricao,tipoValor,valor}: TransacoesProps)=>{
        if(transacoes){
            const newTransacoes = [...transacoes,{id, uid, data_transacao,descricao,tipoValor,valor}] as TransacoesProps[];
            setTransacoes(newTransacoes);
        }else{
            setTransacoes([{id,data_transacao,uid, descricao,tipoValor,valor}]);
        }
    }

    return(
        <TransacoesContext.Provider value={{transacoes: transacoes ?? [], handleAddTransaction, startDate, endDate, setEndDate, setStartDate}}>
            {children}
        </TransacoesContext.Provider>
    )
}


export const useTransacoesContext = ():TransacoesData=>{
    const context = useContext(TransacoesContext);
    if(context === undefined){
        throw new Error('useAuthContext must be abled within a AuthProvider')
    }
    return context;
}