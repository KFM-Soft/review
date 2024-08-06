import { IcmsProduto } from "./IcmsProduto";

export type IcmsNota = {
    nomeArquivo: string;
    numeroNota: string;
    nomeFornecedor: string;
    nomeEmpresa: string;
    ufEmitente: string;
    ufDestinatario: string;
    produtos: IcmsProduto[];
}