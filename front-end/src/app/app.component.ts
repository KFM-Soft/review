import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Usuario } from './models/Usuario';
import { ILoginService, LoginService } from './services/login/i-login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;


  currentUrl = '';
  usuario: Usuario = <Usuario>{};

  constructor(
      router: Router,
      @Inject(LoginService) private loginService: ILoginService) {

    router.events.subscribe(evento => {
      if (evento instanceof NavigationEnd) {
        this.currentUrl = evento.url;
      }
    });

    this.loginService.usuarioAutenticado.subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
      }
    });

  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.usuario.papel == 'ROLE_ADMIN';
  }

  logout(): void {
    this.loginService.logout();
  }

}