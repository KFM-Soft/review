import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Multiplicador } from '../models/Multiplicador';
import { Aliquota } from '../models/Aliquota';
import { Produto } from '../models/Produto';

@Injectable({
  providedIn: 'root'
})
export class MultiplicadorService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.API_URL + '/multiplicador/'

  get(): Observable<Multiplicador[]> {
    let url = this.apiUrl;
    return this.http.get<Multiplicador[]>(url);
  }

  getByAliquotaAndProduto(produto: Produto, aliquota: Aliquota, ): Observable<Multiplicador[]> { 
    let url = this.apiUrl + 'getByProdutoAndAliquota/' + produto.id + '/' + aliquota.id;
    return this.http.get<Multiplicador[]>(url);
  }
  
  save(multiplicador: Multiplicador): Observable<Multiplicador> {
    let url = this.apiUrl;
    if(multiplicador.id)
      return this.http.put<Multiplicador>(url, multiplicador)
    return this.http.post<Multiplicador>(url, multiplicador);
  }

  delete(registro: Multiplicador): Observable<void> {
    let url = this.apiUrl + registro.id;
    return this.http.delete<void>(url);
  }
  
}
