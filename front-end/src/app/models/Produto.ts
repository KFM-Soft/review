import { Empresa } from "./Empresa";

export type Produto = {
    id: number;
    descricao: string;
    ncm: string;
    cest: string | null;
    cfop: string;
    empresa: Empresa;
    sistema: boolean;
}