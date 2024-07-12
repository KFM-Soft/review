import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Aliquota } from '../models/Aliquota';

@Injectable({
  providedIn: 'root'
})
export class AliquotaService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.API_URL + '/aliquota/'

  getAliquotas(): Observable<Aliquota[]> {
    let url = this.apiUrl;
    return this.http.get<Aliquota[]>(url);
  }

  postAliquota(registro: Aliquota): Observable<Aliquota> {
    let url = this.apiUrl;
    return this.http.post<Aliquota>(url, registro);
  }
  
}
