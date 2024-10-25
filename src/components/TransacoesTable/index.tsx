import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { convertToDate } from "../../helpers/convertToDate";
import { useTransacoesContext } from "../../contexts/TransacoesContext";
import Table from "../Table";


const TransacoesTable = ()=>{
    const {transacoes} = useTransacoesContext();
 
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lgw-full h-full">
            <Table thead={['Descrição', 'Valor','Data da transação','Tipo de transação']}>
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
            </Table>            
        </div>
    )
}

export default TransacoesTable;