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

    if(typeof window !== 'undefined') {
      this.sessionStorage = window.sessionStorage;
    }

   }

  private sessionStorage: Storage | null = null;
  private token: string | null = null;


  apiUrl = environment.API_URL + '/relatorio/'

  getRelatorioEmpresaId(empresa_id: number): Observable<Relatorio[]> {
    this.token = window.sessionStorage?.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    let url = this.apiUrl + 'empresa/' + empresa_id;
    return this.http.get<Relatorio[]>(url, httpOptions);
  }
}
