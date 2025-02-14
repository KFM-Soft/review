import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Aliquota } from '../models/Aliquota';
import { RequisicaoPagina } from '../models/requisicao-paginada';
import { RespostaPaginada } from '../models/resposta-paginada';

@Injectable({
    providedIn: 'root'
})
export class AliquotaService {

    constructor(private http: HttpClient) { }

    apiUrl = environment.API_URL + '/aliquota/'

    getTodos(): Observable<Aliquota[]> {
        let url = this.apiUrl + 'busca-todos';
        return this.http.get<Aliquota[]>(url);
    }

    get(termoBusca?: string, requisicaoPagina?: RequisicaoPagina): Observable<RespostaPaginada<Aliquota>> {
        let url = this.apiUrl;
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
        return this.http.get<RespostaPaginada<Aliquota>>(url);
    }

    save(registro: Aliquota): Observable<Aliquota> {
        let url = this.apiUrl;
        if (registro.id)
            return this.http.put<Aliquota>(url, registro);
        return this.http.post<Aliquota>(url, registro);
    }

    delete(registro: Aliquota): Observable<void> {
        let url = this.apiUrl + registro.id;
        return this.http.delete<void>(url);
    }

}
