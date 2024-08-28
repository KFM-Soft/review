import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Empresa } from '../models/Empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.API_URL + '/empresa/'

  get(): Observable<Empresa[]> {
    let url = this.apiUrl;
    return this.http.get<Empresa[]>(url);
  }
  
}
