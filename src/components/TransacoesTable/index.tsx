import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { convertToDate } from "../../helpers/convertToDate";
import { useTransacoesContext } from "../../contexts/TransacoesContext";


const TransacoesTable = ()=>{
    const {transacoes} = useTransacoesContext();

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lgw-full h-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 text-center py-3">
                        Descrição
                    </th>
                    <th scope="col" className="px-6 text-center py-3">
                        Valor
                    </th>
                    <th scope="col" className="px-6 text-center py-3">
                        Data da transação
                    </th>
                    <th scope="col" className="px-6 text-center py-3">
                        Tipo de transação
                    </th>
                </tr>
                </thead>
                <tbody>
                    {transacoes.map(transacao => (
                        <tr key={transacao.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {transacao.descricao}
                        </th>
                        <td className="px-6 py-4 text-center">
                            {Number(transacao.valor).toLocaleString('pt-br',{style:"currency", currency:"BRL"})}
                        </td>
                        <td className="px-6 py-4 text-center">
                            {convertToDate(transacao.data_transacao)}
                        </td>
                        <td className="px-6 py-4 text-center">
                            {transacao.tipoValor === 'S' ? 
                            <div className="flex w-full text-center gap-1 justify-center items-center">
                                <FaArrowDown color="red" /> Saída
                            </div>
                            :
                            <div className="flex w-full text-center gap-1 justify-center items-center">
                                <FaArrowUp color="green" /> Entrada
                            </div>
                            }
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>                
        </div>
    )
}

export default TransacoesTable;