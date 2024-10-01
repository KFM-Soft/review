import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Precificacao } from '../models/Precificacao';

@Injectable({
  providedIn: 'root'
})
export class PrecificacaoService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.API_URL + '/precificacao/'

  get(): Observable<Precificacao[]> {
    let url = this.apiUrl;
    return this.http.get<Precificacao[]>(url);
  }

  save(registro: Precificacao): Observable<Precificacao> {
    let url = this.apiUrl;
    if(registro.id)
      return this.http.put<Precificacao>(url, registro)
    return this.http.post<Precificacao>(url, registro);
  }

  delete(registro: Precificacao): Observable<void> {
    let url = this.apiUrl + registro.id;
    return this.http.delete<void>(url);
  }

}
