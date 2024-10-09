import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Empresa } from '../models/Empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.API_URL + '/empresa/'

  getAllEmpresas(token: string): Observable<Empresa[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get<Empresa[]>(`${this.apiUrl}`, httpOptions);
  }

  getEmpresasIdUsuario(token: string, id_usuario: number): Observable<Empresa[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    
    let url = this.apiUrl + 'usuario/' +  id_usuario

    return this.http.get<Empresa[]>(`${url}`, httpOptions);
  }

  save(empresa: Empresa): Observable<Empresa> {
    let url = this.apiUrl;
    if(empresa.id)
      return this.http.put<Empresa>(url, empresa)
    return this.http.post<Empresa>(url, empresa);
  }
}
