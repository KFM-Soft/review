import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Aliquota } from '../models/Aliquota';

@Injectable({
  providedIn: 'root'
})
export class AliquotaService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.API_URL + '/aliquota/'

  get(): Observable<Aliquota[]> {
    let url = this.apiUrl;
    return this.http.get<Aliquota[]>(url);
  }

  save(registro: Aliquota): Observable<Aliquota> {
    let url = this.apiUrl;
    if(registro.id) 
      return this.http.put<Aliquota>(url, registro)
    return this.http.post<Aliquota>(url, registro);
  }

  delete(registro: Aliquota): Observable<void> {
    let url = this.apiUrl + registro.id;
    return this.http.delete<void>(url);
  }
  
}
