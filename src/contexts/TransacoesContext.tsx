import {createContext, useContext, ReactNode, useState, useEffect, SetStateAction, Dispatch} from "react"
import { TransacoesProps } from "../pages/Home";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebaseConnection";
import { useAuthContext } from "./AuthContext";
import { CategoriasP } from "../pages/Categorias";


type TransacoesData = {
    endDate: string;
    categorias: CategoriasP[];
    handleAddCategoria: ({descricao, uid, id}: CategoriasP) => void;
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
    const [categorias, setCategorias] = useState<CategoriasP[] | null>(null);
    const [transacoes, setTransacoes] = useState<TransacoesProps[] | null>(null);
    const date = new Date();
    const [startDate, setStartDate] = useState(`${date.getFullYear()}-${date.getMonth() + 1 <= 9 ? "0"+ date.getMonth() + 1:date.getMonth() + 1}-01`);
    const [endDate, setEndDate] = useState((new Date).toLocaleDateString('pt-br').split('/').reverse().join("-"));

    useEffect(()=>{
        const loadCategorias = async()=>{
            const q = query(collection(db, "categorias"),
                where("uid", "==", user?.uid),
            )
            const query2Snapshot = await getDocs(q);
            const categoriasList = [] as CategoriasP[];

            query2Snapshot.forEach((doc) => {
                const categoria = {
                    id: doc.id,
                    uid: doc.data().uid,
                    descricao: doc.data().descricao,
                } as CategoriasP;
                categoriasList.push(categoria);
            });
            setCategorias(categoriasList);

        }
        loadCategorias();

    },[])

    useEffect(()=>{
        
        const loadTransacoes = async()=>{
            
            const q = query(collection(db, "transacoes"),
                where("data_transacao", ">=", startDate),
                where("data_transacao", "<=", endDate),
                where("uid", "==", user?.uid),
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
                    categoria_id: doc.data().categoria_id,
                    tipoValor: doc.data().tipoValor,
                } as TransacoesProps;
                transacoesList.push(transacao);
            });
            setTransacoes(transacoesList);
        };

        loadTransacoes();
    },[startDate, endDate])

    const handleAddTransaction = ({id,uid, data_transacao,categoria_id,descricao,tipoValor,valor}: TransacoesProps)=>{
        if(transacoes){
            const newTransacoes = [...transacoes,{id, uid,categoria_id, data_transacao,descricao,tipoValor,valor}] as TransacoesProps[];
            setTransacoes(newTransacoes);
        }else{
            setTransacoes([{id,data_transacao,uid, categoria_id, descricao,tipoValor,valor}]);
        }
    }

    const handleAddCategoria = ({descricao, id, uid}: CategoriasP)=>{
        if(categorias){
            const newCategorias = [...categorias, {descricao, id, uid}] as CategoriasP[];
            setCategorias(newCategorias);
        }else{
            setCategorias([{id, uid, descricao}]);
        }
    }

    return(
        <TransacoesContext.Provider value={{transacoes: transacoes ?? [], categorias: categorias ?? [], handleAddCategoria  ,handleAddTransaction, startDate, endDate, setEndDate, setStartDate}}>
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