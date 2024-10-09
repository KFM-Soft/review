import { Aliquota } from "./Aliquota";
import { Empresa } from "./Empresa";
import { Produto } from "./Produto";

export type Multiplicador = {
    id: number;
    produto: Produto;
    aliquota: Aliquota;
    aliquotaInternaEmit: number;
    mvaOriginal: number;
    multiplicadorOriginal: number;
    mvaAjustada: number | null;
    multiplicadorAjustado: number | null;
    empresa: Empresa;
    sistema: boolean;
}