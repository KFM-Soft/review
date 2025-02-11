import { Injectable } from '@angular/core';
import { NCM } from '../models/NCM';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NcmService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.API_URL + '/produto/'

  get(): Observable<NCM[]> {
    let url = this.apiUrl;
    return this.http.get<NCM[]>(url);
  }

  save(produto: NCM): Observable<NCM> {
    let url = this.apiUrl;
    if(produto.id)
      return this.http.put<NCM>(url, produto)
    return this.http.post<NCM>(url, produto);
  }

  delete(registro: NCM): Observable<void> {
    let url = this.apiUrl + registro.id;
    return this.http.delete<void>(url);
  }


}
