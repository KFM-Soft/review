import { Empresa } from "./Empresa";
import { Estado } from "./Estado";

export type Aliquota = {
    id: number;
    origem: Estado;
    destino: Estado;
    porcentagem: number;
    empresa: Empresa;
    sistema: boolean;
}