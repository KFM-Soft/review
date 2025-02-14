import { HttpClient, HttpRequest } from '@angular/common/http';
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
export class JwtLoginService implements ILoginService {

  constructor(
    private storageService: StoragesService
  ) {
    const userData = this.storageService.getUser() || '{}';
    const usuario = JSON.parse(userData);
    this.usuarioAutenticado.next(usuario);

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
    usuario.id = conteudoToken.id
    usuario.nomeCompleto = conteudoToken.nomeCompleto;
    usuario.nomeUsuario = conteudoToken.sub;
    usuario.papel = conteudoToken.papel;

    this.storageService.setSession('token', token);
    this.storageService.setSession('usuario', JSON.stringify(usuario));
    this.storageService.setSession('tokenExp', tokenExp.toString());
    this.usuarioAutenticado.next(usuario);
  }

  logout(): void {
    this.storageService.removeSession('token');
    this.storageService.removeSession('usuario');
    this.storageService.removeSession('tokenExp');
    if(typeof document !== "undefined"){
        document.cookie = 'XSRF-TOKEN=; Max-Age=0; path=/';
    }
    clearInterval(this.intervaloRenovacao);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {

    const token = this.storageService.getSession('token');
    if (token == null) {
      return false;
    }

    const tokenExp = this.storageService.getSession('tokenExp');
    const tempoExpiracao = new Date(Number(tokenExp));
    const agora = new Date();
    const estaExpirado = tempoExpiracao < agora;
    if (estaExpirado) {
      this.logout();
    }

    return !estaExpirado;

  }

  getHeaders(request: HttpRequest<any>): HttpRequest<any> {
    if (this.isLoggedIn()) {
      this.fezRequisicao = true;
      const token = this.storageService.getSession('token');
      return request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
    }
    return request;
  }

}
