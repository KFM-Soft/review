import { Aliquota } from "./Aliquota";
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
}