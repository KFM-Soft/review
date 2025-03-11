import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Estado } from '../models/Estado';
import { RequisicaoPagina } from '../models/requisicao-paginada';
import { RespostaPaginada } from '../models/resposta-paginada';

@Injectable({
    providedIn: 'root'
})
export class EstadoService {
    constructor(private http: HttpClient) { }

    apiUrl = environment.API_URL + '/estado/'

    getTodos(): Observable<Estado[]> {
        let url = this.apiUrl + 'busca-todos';
        return this.http.get<Estado[]>(url);
    }

    get(termoBusca?: string, requisicaoPagina?: RequisicaoPagina): Observable<RespostaPaginada<Estado>> {
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
        return this.http.get<RespostaPaginada<Estado>>(url);
    }

    save(registro: Estado): Observable<Estado> {
        let url = this.apiUrl;
        if (registro.id)
            return this.http.put<Estado>(url, registro)
        return this.http.post<Estado>(url, registro);
    }

    delete(registro: Estado): Observable<void> {
        let url = this.apiUrl + registro.id;
        return this.http.delete<void>(url);
    }


}
