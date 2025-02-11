import { Empresa } from "./Empresa";

export type NCM = {
    id: number;
    descricao: string;
    ncm: string;
    cest: string | null;
    empresa: Empresa;
    sistema: boolean;
}