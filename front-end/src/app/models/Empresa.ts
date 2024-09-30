import { Precificacao } from "./Precificacao"
import { Usuario } from "./Usuario"

export type Empresa = {
  id: number,
  dono: Usuario,
  nome: string,
  nomeFantasia: string,
  cnpj: string,
  preco: Precificacao
}
