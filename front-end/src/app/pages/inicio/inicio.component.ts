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
import { StoragesService } from '../../services/storages.service';

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

  constructor(
    private storageService: StoragesService, 
    private empresasService: EmpresasService,
  ) {
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas(): void {

    const userData = this.storageService.getSession('usuario') || '{}';
    const token = this.storageService.getSession('token') || '{}';
    const usuario:Usuario = JSON.parse(userData);

    this.empresasService.getEmpresasIdUsuario(token, usuario.id).subscribe({
      next: (response: Empresa[]) => { this.data = response }
      
    });
    
  }
}
