import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

interface Empresas {
  numero: Number;
  data_processamento: string;
  fornecedor: string;
  valor: string;
  quantidadeP: Number;
  quantidadeT: Number;
  diferenca: string;
  origem: string;
  destino: string;
  button: boolean
}

@Component({
  selector: 'app-regras-de-processamento',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, NzBreadCrumbModule, NzCardModule, NzFlexModule, NzTableModule, NzFlexModule, NzButtonModule,NzPaginationModule, RouterLink,],
  templateUrl: './regras-de-processamento.component.html',
  styleUrl: './regras-de-processamento.component.scss'
})
export class RegrasDeProcessamentoComponent {
  empresas: Empresas[] = [
    { numero: 1, data_processamento: '02/04/2024', fornecedor: 'Recol distribuição e Comércio LTDA', valor: '5.000,00', quantidadeP: 566, quantidadeT: 575, diferenca: '503,13', origem: 'SP', destino: 'AC', button: true},
    { numero: 1, data_processamento: '02/04/2024', fornecedor: 'Recol distribuição e Comércio LTDA', valor: '5.000,00', quantidadeP: 566, quantidadeT: 575, diferenca: '503,13', origem: 'SP', destino: 'AC', button: true},
    { numero: 1, data_processamento: '02/04/2024', fornecedor: 'Recol distribuição e Comércio LTDA', valor: '5.000,00', quantidadeP: 566, quantidadeT: 575, diferenca: '503,13', origem: 'SP', destino: 'AC', button: true},
    { numero: 1, data_processamento: '02/04/2024', fornecedor: 'Recol distribuição e Comércio LTDA', valor: '5.000,00', quantidadeP: 566, quantidadeT: 575, diferenca: '503,13', origem: 'SP', destino: 'AC', button: true},
    { numero: 1, data_processamento: '02/04/2024', fornecedor: 'Recol distribuição e Comércio LTDA', valor: '5.000,00', quantidadeP: 566, quantidadeT: 575, diferenca: '503,13', origem: 'SP', destino: 'AC', button: true},
  ];

  registros: Empresas[] = [];
  total = this.empresas.length;
  paginaTamanho = 5;
  paginaIndex = 1;
  termoBusca: string = '';
  selectTag: string = '';

  ngOnInit(): void {
    this.atualizarTabela();
  };

  atualizarTabela(): void {
    let filtro = this.empresas;

    this.total = filtro.length;
    const startIndex = (this.paginaIndex - 1) * this.paginaTamanho;
    const endIndex = startIndex + this.paginaTamanho;
    this.registros = filtro.slice(startIndex, endIndex);
  };

  atulizarPagina(paginaindex: number): void {
    this.paginaIndex = paginaindex;
    this.atualizarTabela();
  }

  tamanhoPagina(paginaTamanho: number): void {
    this.paginaTamanho = paginaTamanho;
    this.atualizarTabela();
  }
}
