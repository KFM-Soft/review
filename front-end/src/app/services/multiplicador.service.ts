import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Observable } from 'rxjs';
import { Multiplicador } from '../models/Multiplicador';
import { Aliquota } from '../models/Aliquota';
import { NCM } from '../models/NCM';
import { RequisicaoPagina } from '../models/requisicao-paginada';
import { RespostaPaginada } from '../models/resposta-paginada';

@Injectable({
    providedIn: 'root'
})
export class MultiplicadorService {

    constructor(private http: HttpClient) { }

    apiUrl = environment.API_URL + '/multiplicador/'

    get(termoBusca?: string, requisicaoPagina?: RequisicaoPagina, adicionarUrl?: string): Observable<RespostaPaginada<Multiplicador>> {
        let url = this.apiUrl + adicionarUrl;
        let params: string[] = [];

        if (termoBusca) {
            params.push("termoBusca=" + termoBusca);
        }

        if (requisicaoPagina) {
            params.push("page=" + requisicaoPagina.page);
            params.push("size=" + requisicaoPagina.size);
            requisicaoPagina.sort.forEach(campo => {
                params.push("sort=" + campo);
            });
        }

        if (params.length > 0) {
            url += "?" + params.join("&");
        }
        return this.http.get<RespostaPaginada<Multiplicador>>(url);
    }

    getDoSistema(termoBusca?: string, requisicaoPagina?: RequisicaoPagina): Observable<RespostaPaginada<Multiplicador>> {
        return this.get(termoBusca, requisicaoPagina, 'sistema/true');
    }

    getDaEmpresa(idEmpresa: number, termoBusca?: string, requisicaoPagina?: RequisicaoPagina): Observable<RespostaPaginada<Multiplicador>> {
        return this.get(termoBusca, requisicaoPagina, 'empresa/' + idEmpresa);
    }

    getByAliquotaAndProduto(produto: NCM, aliquota: Aliquota,): Observable<Multiplicador[]> {
        let url = this.apiUrl + 'getByProdutoAndAliquota/' + produto.id + '/' + aliquota.id;
        return this.http.get<Multiplicador[]>(url);
    }

    save(multiplicador: Multiplicador): Observable<Multiplicador> {
        let url = this.apiUrl;
        if (multiplicador.id)
            return this.http.put<Multiplicador>(url, multiplicador)
        return this.http.post<Multiplicador>(url, multiplicador);
    }

    delete(registro: Multiplicador): Observable<void> {
        let url = this.apiUrl + registro.id;
        return this.http.delete<void>(url);
    }

}
