import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Produto } from '../models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.API_URL + '/produto/'

  get(): Observable<Produto[]> {
    let url = this.apiUrl;
    return this.http.get<Produto[]>(url);
  }
  
  save(produto: Produto): Observable<Produto> {
    let url = this.apiUrl;
    if(produto.id)
      return this.http.put<Produto>(url, produto)
    return this.http.post<Produto>(url, produto);
  }

  delete(registro: Produto): Observable<void> {
    let url = this.apiUrl + "/" + registro.id;
    return this.http.delete<void>(url);
  }
  
}
