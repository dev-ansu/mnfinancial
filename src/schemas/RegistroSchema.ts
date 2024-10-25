import { z } from "zod";

export const RegistroSchema = z.object({
    descricao: z.string().min(1, 'Campo obrigatório.'),
    data_transacao: z.string().date("Digite uma data válida."),
    valor: z.string().refine((val) => {
        const regex = /^\d+(\.\d+)?$/;
        return regex.test(val);
    }, {
        message: "Por favor, insira um número válido (decimais separados por ponto)."
    }),
    tipoValor: z.string({message:'Escolha uma das opções'}).refine((value: string) =>{
        value =  value.toLocaleUpperCase() 
        return value === 'E' || value === 'S' ? true:false;
    }, {message:"Escolha uma das opções."}),
});

export type RegistroProps = z.infer<typeof RegistroSchema>;