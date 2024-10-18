import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Relatorio } from '../models/Relatorio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(private http: HttpClient) {


  }


  apiUrl = environment.API_URL + '/relatorio/'

  getRelatorioEmpresaId(empresa_id: number): Observable<Relatorio[]> {

    let url = this.apiUrl + 'empresa/' + empresa_id;
    return this.http.get<Relatorio[]>(url);
  }
}
