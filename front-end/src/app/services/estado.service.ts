import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { Estado } from '../models/Estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  constructor(private http: HttpClient) { }

  apiUrl = environment.API_URL + '/estado/'

  getEstados(): Observable<Estado[]> {
    let url = this.apiUrl;
    return this.http.get<Estado[]>(url);
  }

}
