import { Empresa } from "./Empresa";

export type NCM = {
    id: number;
    descricao: string | null;
    ncm: string;
    cest: string | null;
    empresa: Empresa;
    sistema: boolean;
}