import { EmpresasService } from './../../services/empresas.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Observable } from 'rxjs';
import { Empresa } from '../../models/Empresa';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, NzBreadCrumbModule, NzCardModule, NzFlexModule, NzTableModule, NzFlexModule, NzButtonModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {
  empresas: Observable<Empresa[]> | undefined;
  data: Empresa[] = Array<Empresa>();

  t = false;

  private token: string | null = null;
  private sessionStorage: Storage | null = null;

  constructor(
    private empresasService: EmpresasService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if(typeof window !== 'undefined') {
      this.sessionStorage = window.sessionStorage;
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.token = window.sessionStorage?.getItem('token');
      this.getEmpresas();
    }
  }

  getEmpresas(): void {

    const userData = this.sessionStorage?.getItem('usuario') || '{}';
    const usuario:Usuario = JSON.parse(userData);
    if (this.token) {
      this.empresasService.getEmpresasIdUsuario(this.token, usuario.id).subscribe({
        next: (response: Empresa[]) => { this.data = response }
        
      });
    }
  }
}
