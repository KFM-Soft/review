import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable, catchError, map, of } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(
    private http: HttpClient
  ) { }

  private url: string = environment.API_URL + '/user';
  private type!: string;
  private logged: boolean = false;

  login(info: any): Observable<any> {
    const body = {
      email: info.email,
      password: info.password
    };

    return this.http.post(this.url + '/login', body).pipe(
      map((data: any) => {
        if (data.token) {
          this.type = data.type;
          this.logged = true
          return {
            login: true,
            token: data.token,
            message: 'Login efetuado com sucesso!',
            type: data.type
          };
        }

        return {
          login: false,
          token: data.customMessage,
          message: 'Erro no login!',
          type: null
        };
      }),
      catchError((error) => {
        return of({
          login: false,
          token: null,
          message: error.error ? error.error.customMessage : 'Erro desconhecido',
          type: null
        });
      })
    );
  }

  isLogged(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + `${token}`
      })
    };

    return this.http.get(`${this.url}/logged`, httpOptions);
  }

  getUserData(token: string): Observable<Usuario> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + `${token}`
      })
    };
    return this.http.get<Usuario>(`${this.url}/data`, httpOptions);
  }

  getAllUsers(token: string): Observable<Usuario[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + `${token}`
      })
    };
    return this.http.get<Usuario[]>(`${this.url}`, httpOptions);
  }


  insertUser(info: any): Observable<Usuario> {
    const body = {
      exibitionName: info.string,
      userName: info.string,
      password: info.string,
      qtdEmpresas: info.number,
    };

    return this.http.post<Usuario>(`${this.url}`, body);
  }

  deleteUser(id: number, token: string): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + `${token}`
      })
    };

    return this.http.delete<void>(`${this.url}/${id}`, httpOptions);
  }
}
