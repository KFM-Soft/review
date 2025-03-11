import { Injectable } from '@angular/core';
import { NCM } from '../models/NCM';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespostaPaginada } from '../models/resposta-paginada';
import { RequisicaoPagina } from '../models/requisicao-paginada';

@Injectable({
    providedIn: 'root'
})
export class NcmService {

    constructor(private http: HttpClient) { }

    apiUrl = environment.API_URL + '/ncm/'

    get(termoBusca?: string, requisicaoPagina?: RequisicaoPagina): Observable<RespostaPaginada<NCM>> {
        let url = this.apiUrl;
        let params: string[] = [];

        if (termoBusca) {
            params.push("termoBusca=" + encodeURIComponent(termoBusca));
        }

        if (requisicaoPagina) {
            params.push("page=" + requisicaoPagina.page);
            params.push("size=" + requisicaoPagina.size);
            requisicaoPagina.sort.forEach(campo => {
                params.push("sort=" + encodeURIComponent(campo));
            });
        }

        if (params.length > 0) {
            url += "?" + params.join("&");
        }
        return this.http.get<RespostaPaginada<NCM>>(url);
    }

    save(ncm: NCM): Observable<NCM> {
        let url = this.apiUrl;
        if (ncm.id)
            return this.http.put<NCM>(url, ncm)
        return this.http.post<NCM>(url, ncm);
    }

    delete(registro: NCM): Observable<void> {
        let url = this.apiUrl + registro.id;
        return this.http.delete<void>(url);
    }


}
