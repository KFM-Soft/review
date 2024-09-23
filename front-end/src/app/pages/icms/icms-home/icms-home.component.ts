import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { Empresa } from '../../../models/Empresa';
import { Observable } from 'rxjs';
import { EmpresasService } from '../../../services/empresas.service';

@Component({
  selector: 'app-icms',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzCardModule,
    NzFlexModule,
    NzTableModule,
    NzButtonModule,
    NzPaginationModule,
    NzInputModule,
    NzSelectModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './icms-home.component.html',
  styleUrls: ['./icms-home.component.scss']
})
export class IcmsHomeComponent implements OnInit {
  empresas: Empresa[] = [];  
  data: Empresa[] = [];

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
      this.token = window.sessionStorage.getItem('token');
      this.getEmpresas();
    }
    this.atualizarTabela();
  }

  getEmpresas(): void {
    if (this.token) {
      this.empresasService.getAllEmpresas(this.token).subscribe({
        next: (response: Empresa[]) => {
          this.data = response;
          this.empresas = response;  
          this.atualizarTabela();    
        },
        error: (err) => {
          console.error('Erro ao buscar empresas:', err);
          this.data = [];
          this.atualizarTabela();
        }
      });
    }
  }

  registros: Empresa[] = [];
  total = 0;
  paginaTamanho = 5;
  paginaIndex = 1;
  termoBusca: string = '';
  selectTag: string = '';

  atualizarTabela(): void {
    let filtro = this.data || [];
  
    if (this.termoBusca) {
      filtro = filtro.filter(empresa =>
        empresa.nome.toLowerCase().includes(this.termoBusca.toLowerCase())
      );
    }
  
    if (this.selectTag) {
      filtro = filtro.filter(empresa => {
        return 'tag' in empresa ? empresa.tag === this.selectTag : true;
      });
    }
  
    this.total = filtro.length;
    const startIndex = (this.paginaIndex - 1) * this.paginaTamanho;
    const endIndex = startIndex + this.paginaTamanho;
    this.registros = filtro.slice(startIndex, endIndex);
  }
  
  

  atualizarPagina(paginaIndex: number): void {
    this.paginaIndex = paginaIndex;
    this.atualizarTabela();
  }

  tamanhoPagina(paginaTamanho: number): void {
    this.paginaTamanho = paginaTamanho;
    this.atualizarTabela();
  }
}
