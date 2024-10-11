import { Component, Renderer2 } from '@angular/core';
import { PrecificacaoService } from '../../../services/precificacao.service';
import { StoragesService } from '../../../services/storages.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { Precificacao } from '../../../models/Precificacao';
import { CommonModule } from '@angular/common';
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
  selector: 'app-precificacao',
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
  templateUrl: './precificacao.component.html',
  styleUrl: './precificacao.component.scss'
})
export class PrecificacaoComponent {
  constructor(
    private service: PrecificacaoService,
    private storageService: StoragesService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
  ) { }

  registros: Precificacao[] = [];
  precificacao: Precificacao[] = [];
  total: number = 0;
  paginaTamanho = 5;
  paginaIndex = 1;
  termoBusca: string = '';

  ngOnInit(): void {
    this.service.get().subscribe({
      next: (retorno: Precificacao[]) => {
        this.registros = retorno;
        this.precificacao = retorno;
      },
      error: (error) => {
        console.error('Erro ao carregar precificacao:', error);
      }
    })
  }

  atualizarTabela(): void {
    let filtro = this.precificacao;
    if (this.termoBusca) {
      filtro = filtro.filter(precificacao => 
        precificacao.opcao.toLowerCase().includes(this.termoBusca.toLowerCase())
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

  editarItem(registro: Precificacao){
    this.storageService.setSession('precificacao', registro);
    this.router.navigate(['./form'], {relativeTo: this.route, queryParams: {id: registro.id}});
  }

  excluirItem(registro: Precificacao){
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
