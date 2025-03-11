import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Empresa } from '../models/Empresa';
import { RespostaPaginada } from '../models/resposta-paginada';
import { RequisicaoPagina } from '../models/requisicao-paginada';

@Injectable({
    providedIn: 'root'
})
export class EmpresasService {

    constructor(private http: HttpClient) { }

    apiUrl = environment.API_URL + '/empresa/'

    getId(token: string, empresa_id: number): Observable<Empresa> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        };
        let url = this.apiUrl + empresa_id
        return this.http.get<Empresa>(`${url}`, httpOptions);
    }

    get(token: string, termoBusca?: string, requisicaoPagina?: RequisicaoPagina): Observable<RespostaPaginada<Empresa>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        };
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
        return this.http.get<RespostaPaginada<Empresa>>(url, httpOptions);
    }

    getEmpresasIdUsuario(token: string, id_usuario: number, termoBusca?: string, requisicaoPagina?: RequisicaoPagina): Observable<RespostaPaginada<Empresa>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        };

        let url = this.apiUrl + 'usuario/' + id_usuario
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
        return this.http.get<RespostaPaginada<Empresa>>(url, httpOptions);
    }

    save(empresa: Empresa): Observable<Empresa> {
        let url = this.apiUrl;
        if (empresa.id)
            return this.http.put<Empresa>(url, empresa)
        return this.http.post<Empresa>(url, empresa);
    }

    delete(registro: Empresa): Observable<void> {
        let url = this.apiUrl + registro.id;
        return this.http.delete<void>(url);
    }
}
