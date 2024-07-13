import { Component, OnInit, Renderer2 } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { Produto } from '../../../models/Produto';
import { ProdutoService } from '../../../services/produtos.service';
import { AdmComponent } from '../adm.component';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-Produto',
  standalone: true,
  imports: [
    CommonModule,
    NzMenuModule,
    NzLayoutModule,
    NzIconModule,
    NzFlexModule,
    NzTableModule,
    NzButtonModule,
    NzPaginationModule,
    NzInputModule,
    NzGridModule,
    FormsModule,
    RouterLink,
    AdmComponent,
  ],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutoComponent implements OnInit {
  
  constructor(
    private renderer: Renderer2,
    private service: ProdutoService
  ) { }

  registros: Produto[] = [];
  produtos: Produto[] = [];
  total: number = 0;
  paginaTamanho = 5;
  paginaIndex = 1;
  termoBusca: string = '';

  ngOnInit(): void {
    this.service.getProdutos().subscribe({
      next: (retorno: Produto[]) => {
        this.registros = retorno
        this.produtos = retorno
      },
      error: (error) => {
        console.error('Erro ao carregar Produtos:', error);
      }
    })
  }

  atualizarTabela(): void {
    let filtro = this.produtos;

    if (this.termoBusca) {

      filtro = filtro.filter(produto => 
        produto.descricao.toLowerCase().includes(this.termoBusca.toLowerCase()) 
          || 
          produto.cest.toLowerCase().includes(this.termoBusca.toLowerCase())
          || 
          produto.cfop.toLowerCase().includes(this.termoBusca.toLowerCase())
          || 
          produto.ncm.toLowerCase().includes(this.termoBusca.toLowerCase())
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

}
