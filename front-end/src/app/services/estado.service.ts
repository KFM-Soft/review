import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Estado } from '../models/Estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  constructor(private http: HttpClient) { }

  apiUrl = environment.API_URL + '/estado/'

  get(): Observable<Estado[]> {
    let url = this.apiUrl;
    return this.http.get<Estado[]>(url);
  }

  save(registro: Estado): Observable<Estado> {
    let url = this.apiUrl;
    if(registro.id) 
      return this.http.put<Estado>(url, registro)
    return this.http.post<Estado>(url, registro);
  }

  delete(registro: Estado): Observable<void> {
    let url = this.apiUrl + registro.id;
    return this.http.delete<void>(url);
  }
  

}
