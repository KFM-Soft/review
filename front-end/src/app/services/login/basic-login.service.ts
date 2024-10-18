import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../../models/Usuario';
import { ILoginService } from './i-login.service';
import { environment } from '../../../environments/environment';
import { StoragesService } from '../storages.service';
@Injectable({
  providedIn: 'root'
})
export class BasicLoginService implements ILoginService {

  constructor(
    private storegeService: StoragesService
  ) {

    const userData = this.storegeService.getUser() || '{}';
    const usuario = JSON.parse(userData);
    this.usuarioAutenticado.next(usuario)
    
  }

  usuarioAutenticado: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(<Usuario>{});
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  login(usuario: Usuario): void {
    
    const credenciaisCodificadas = btoa(
      usuario.nomeUsuario + ':' + usuario.senha
    );
    const opcoesHttp = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + credenciaisCodificadas
      })
    };
    const url = environment.API_URL + '/login';

    this.http.get<Usuario>(url, opcoesHttp).subscribe({
      next: (usuario: Usuario) => {
        this.storegeService.setSession('usuario', JSON.stringify(usuario));
        this.usuarioAutenticado.next(usuario);
      },
      complete: () => {
        this.router.navigate(['/']);
      }
    });

  }

  logout(): void {
    this.storegeService.removeSession('usuario');
    document.cookie = 'XSRF-TOKEN=; Max-Age=0; path=/';
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const userData = this.storegeService.getSession('usuario') || '{}';
    const usuario = JSON.parse(userData);
    return Object.keys(usuario).length > 0;
  }

  getHeaders(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      withCredentials: true,
      headers: request.headers.set('X-Requested-With', 'XMLHttpRequest')
    })
  }

}