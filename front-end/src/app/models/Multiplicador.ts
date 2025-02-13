import { Aliquota } from "./Aliquota";
import { Empresa } from "./Empresa";
import { NCM } from "./NCM";

export type Multiplicador = {
    id: number;
    ncm: NCM;
    aliquota: Aliquota;
    aliquotaInternaEmit: number;
    mvaOriginal: number | null;
    multiplicadorOriginal: number | null;
    mvaAjustada: number | null;
    multiplicadorAjustado: number | null;
    empresa: Empresa;
    sistema: boolean;
}