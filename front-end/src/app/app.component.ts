import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Usuario } from './models/Usuario';
import { ILoginService, LoginService } from './services/login/i-login.service';
import { AlertaComponent } from './pages/alerta/alerta.component';
import { StoragesService } from './services/storages.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RouterLink, AlertaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;


  currentUrl = '';
  usuario: Usuario = <Usuario>{};

  constructor(
    router: Router,
    @Inject(LoginService) private loginService: ILoginService,
    private storageService: StoragesService
  ) {

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url != '') {
          this.currentUrl = event.url;
        } else {
          this.currentUrl = '';
        }
      } else if (event instanceof NavigationStart) {
        const userData = this.storageService.getUser() || '{}';
        const usuario = JSON.parse(userData);
        this.usuario = usuario
        
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
