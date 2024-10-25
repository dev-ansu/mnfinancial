import { ReactNode } from "react";

interface TableProps{
    thead: string[];
    children: ReactNode;
}

const Table = ({thead, children}: TableProps)=>{

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lgw-full h-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {thead.map( (th: string)=> (
                        <th key={th} scope="col" className="px-6 text-center py-3">
                            {th}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>                
        </div>
    )
}

export default Table;