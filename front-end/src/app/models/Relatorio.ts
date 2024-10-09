import { Empresa } from "./Empresa";

export type Relatorio = {
    id: number;
    valorTotal: number;
    valorCalculado: number;
    empresa: Empresa;
    arquivo: string;
}