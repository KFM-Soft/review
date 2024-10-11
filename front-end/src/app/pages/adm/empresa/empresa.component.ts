import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { EmpresasService } from '../../../services/empresas.service';
import { StoragesService } from '../../../services/storages.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Empresa } from '../../../models/Empresa';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { AdmComponent } from '../adm.component';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [
    CommonModule,
    NzMenuModule,
    NzLayoutModule,
    NzIconModule,
    NzFlexModule,
    NzTableModule,
    NzButtonModule,
    NzGridModule,
    NzPaginationModule,
    NzInputModule,
    FormsModule,
    RouterLink,
    AdmComponent,
  ],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.scss'
})
export class EmpresaComponent {
  constructor(
    private service: EmpresasService,
    private storageService: StoragesService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  registros: Empresa[] = [];
  empresas: Empresa[] = [];
  total: number = 0;
  paginaTamanho = 5;
  paginaIndex = 1;
  termoBusca: string = '';
  private token: string | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.token = window.sessionStorage.getItem('token');
    }
    if(this.token)
    this.service.get(this.token).subscribe({
      next: (retorno: Empresa[]) => {
        this.registros = retorno;
        this.empresas = retorno;
        
      },
      error: (error) => {
        console.error('Erro ao carregar empresas:', error);
      }
    })
  }

  atualizarTabela(): void {
    let filtro = this.empresas;
    if (this.termoBusca) {
      filtro = filtro.filter(empresa => 
        empresa.nome.toLowerCase().includes(this.termoBusca)
        ||
        empresa.cnpj.toLowerCase().includes(this.termoBusca)
        ||
        empresa.nomeFantasia.toLowerCase().includes(this.termoBusca)
      );
    }

    this.total = filtro.length;
    const startIndex = (this.paginaIndex - 1) * this.paginaTamanho;
    const endIndex = startIndex + this.paginaTamanho;
    this.registros = filtro.slice(startIndex, endIndex);
  }

  atualizarPagina(paginaindex: number): void {
    this.paginaIndex = paginaindex;
    this.atualizarTabela();
  }

  tamanhoPagina(paginaTamanho: number): void {
    this.paginaTamanho = paginaTamanho;
    this.atualizarTabela();
  }

  editarItem(registro: Empresa){
    this.storageService.setSession('aliquota', registro);
    this.router.navigate(['./form'], {relativeTo: this.route, queryParams: {id: registro.id}});
  }

  excluirItem(registro: Empresa){
    this.service.delete(registro).subscribe({
      complete: () => {
        alert("Registro excluido com sucesso.");
        window.location.reload();
      }, error: (erro) => {
        alert("Erro na exclusão!");
        window.location.reload();
      }
    })
  }
}
