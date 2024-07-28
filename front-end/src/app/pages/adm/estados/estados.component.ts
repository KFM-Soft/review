import { Component, OnInit, Renderer2 } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { Estado } from '../../../models/Estado';
import { EstadoService } from '../../../services/estado.service';
import { AdmComponent } from '../adm.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { StoragesService } from '../../../services/storages.service';

@Component({
  selector: 'app-estado',
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
  templateUrl: './estados.component.html',
  styleUrl: './estados.component.scss'
})
export class EstadosComponent implements OnInit {
  
  constructor(
    private service: EstadoService,
    private storageService: StoragesService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
  ) { }

  registros: Estado[] = [];
  estados: Estado[] = [];
  total: number = 0;
  paginaTamanho = 5;
  paginaIndex = 1;
  termoBusca: string = '';

  ngOnInit(): void {
    this.service.get().subscribe({
      next: (retorno: Estado[]) => {
        this.registros = retorno;
        this.estados = retorno;
      },
      error: (error) => {
        console.error('Erro ao carregar estados:', error);
      }
    })
  }

  atualizarTabela(): void {
    let filtro = this.estados;
    if (this.termoBusca) {
      filtro = filtro.filter(estado => 
        estado.nome.toLowerCase().includes(this.termoBusca.toLowerCase()) 
          || 
          estado.uf.toLowerCase().includes(this.termoBusca.toLowerCase())
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

  editarItem(estado: Estado){
    this.storageService.setSession('estado', estado);
    this.router.navigate(['./form'], {relativeTo: this.route, queryParams: {id: estado.id}});
  }

  excluirItem(registro: Estado){
    this.service.delete(registro).subscribe({
      complete: () => {
        alert("Registro excluido com sucesso.");
      }, error: (erro) => {
        console.error("Erro ao excluir:", erro);
        alert("Erro na exclusão!");
      }
    })
  }

}
