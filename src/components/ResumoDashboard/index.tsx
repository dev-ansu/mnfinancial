import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import Card from "../Card";
import { MdOutlineAttachMoney } from "react-icons/md";
import { ChangeEvent, useEffect, useState } from "react";
import Input from "../Input";
import { CgDanger } from "react-icons/cg";
import { useTransacoesContext } from "../../contexts/TransacoesContext";



const ResumoDashboard = ()=>{
    
    const [totalEntradas, setTotalEntradas] = useState<number>(0);
    const [totalSaidas, setTotalSaidas] = useState<number>(0);
    const {transacoes, endDate, startDate, setEndDate,setStartDate} = useTransacoesContext();
    
    useEffect(()=>{
        const entradas = transacoes.filter( (transacao) => transacao.tipoValor == 'E')
        .reduce((prev, cur) => prev + Number(cur.valor),0);
        const saidas = transacoes.filter( (transacao) => transacao.tipoValor == 'S')
        .reduce((prev, cur) => prev + Number(cur.valor),0);

        setTotalEntradas(entradas);
        setTotalSaidas(saidas);
    },[transacoes])
    
    return(
        <>
            <div className="flex justify-center items-center gap-2 w-full py-2 px-2 rounded border ">
                <label htmlFor="startDate">De</label>
                <Input 
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
                />  
                <label htmlFor="endDate">Até</label>
                <Input 
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
                />                
            </div>
            <div className="md:grid md:grid-cols-3 w-full flex overflow-auto gap-2">
                <Card
                    className="bg-green-400"
                    title="Entradas"
                    value={totalEntradas}
                    icon={<FaArrowAltCircleUp />}
                />

                <Card
                    className="bg-red-400"
                    title="Saídas"
                    value={totalSaidas}
                    icon={<FaArrowAltCircleDown />}
                />
                <div className="bg-blue-400 text-white">
                <Card
                    className="border-none"
                    title="Total"
                    value={Number(totalEntradas) - Number(totalSaidas)}
                    icon={<MdOutlineAttachMoney  />}
                    />
                    <p className="px-2">{((Number(totalSaidas) / Number(totalEntradas)) * 100) > 50 ? 
                        <>
                           <span className="flex gap-1 text-orange-800 font-bold justify-center items-center">
                           <CgDanger /> Cuidado! As suas saídas já ultrapassaram {((Number(totalSaidas) / Number(totalEntradas)) * 100).toFixed(2)}% das entradas.
                           </span>
                        </>
                    :''}</p>
                </div>

            </div>
        </>
    );
}

export default ResumoDashboard;