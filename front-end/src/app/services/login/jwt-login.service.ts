import { HttpClient, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../../models/Usuario';
import { ILoginService } from './i-login.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtLoginService implements ILoginService {

  constructor() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const userData = sessionStorage.getItem('usuario') || '{}';
      const usuario = JSON.parse(userData);
      this.usuarioAutenticado.next(usuario);
    } else {
      this.usuarioAutenticado.next(<Usuario>{});
    }
    if (this.isLoggedIn()) {
      this.agendarRenovacaoToken();
    }
  }

  usuarioAutenticado: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(<Usuario>{});
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private fezRequisicao: boolean = false;
  private intervaloRenovacao: any;

  private agendarRenovacaoToken(): void {
    const intervalo = 1000 * 10;
    this.intervaloRenovacao = setInterval(() => {
      if (this.fezRequisicao) {
        this.renovarToken();
        this.fezRequisicao = false;
      }
    }, intervalo);
  }

  private renovarToken(): void {
    const url = environment.API_URL + '/refresh';
    this.http.get(url, { responseType: 'text' }).subscribe({
      next: (token: string) => {
        this.configurarSessaoUsuario(token);
      }
    })
  }

  login(usuario: Usuario): void {
    const url = environment.API_URL + '/login';
    this.http.post(url, usuario, { responseType: 'text' }).subscribe({
      next: (token: string) => {
        console.log(token);
        this.configurarSessaoUsuario(token);
        this.agendarRenovacaoToken();
      },
      complete: () => {
        this.router.navigate(['/']);
      }
    });
  }

  private configurarSessaoUsuario(token: string) {
    const payload = token.split('.')[1];
    const payloadDecodificado = atob(payload);
    const conteudoToken = JSON.parse(payloadDecodificado);
    const tokenExp = conteudoToken.exp * 1000;

    const usuario = <Usuario>{};
    usuario.nomeCompleto = conteudoToken.nomeCompleto;
    usuario.nomeUsuario = conteudoToken.sub;
    usuario.papel = conteudoToken.papel;

    sessionStorage.setItem('token', token);
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    sessionStorage.setItem('tokenExp', tokenExp.toString());

    this.usuarioAutenticado.next(usuario);
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('tokenExp');
    clearInterval(this.intervaloRenovacao);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    
    const token = sessionStorage.getItem('token');
    const tokenNaoNulo = token != null;
    
    const tokenExp = sessionStorage.getItem('tokenExp');
    const tempoExpiracao = new Date(Number(tokenExp));
    const agora = new Date();
    const naoEstaExpirado = tempoExpiracao > agora;

    return tokenNaoNulo && naoEstaExpirado;

  }

  getHeaders(request: HttpRequest<any>): HttpRequest<any> {
    if (this.isLoggedIn()) {
      this.fezRequisicao = true;
      const token = sessionStorage.getItem('token');
      return request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
    }
    return request;
  }

}