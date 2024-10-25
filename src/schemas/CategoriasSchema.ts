import { z } from "zod";

export const CategoriaSchema = z.object({
    descricao: z.string().min(2, 'Campo obrigatório.'),
});

export type CategoriaProps = z.infer<typeof CategoriaSchema>;