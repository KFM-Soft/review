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
  item: Number;
  nome: string;
  valor: string;
  ncm_sh: Number;
  cest: String;
  descricao: String;
  aliq_interestadual: Number;
  aliq_interna: Number;
  mva: Number;
  multiplicador: Number
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
    { item: 1.0, nome: 'Sandalias Havaianas Brasil FC Azul Natal', valor: '10.324,80', ncm_sh: 64022000, cest: 'Não tem', descricao: 'Calçado com parte superior em tiras ou correias, fixados à sola por pregos, tachas, pinos e semelhantes', aliq_interestadual: 12, aliq_interna: 23, mva: 36.56, multiplicador: 11.22 },
    { item: 2.0, nome: 'Sandalias Havaianas Brasil FC Azul Natal', valor: '10.324,80', ncm_sh: 64022000, cest: 'Não tem', descricao: 'Calçado com parte superior em tiras ou correias, fixados à sola por pregos, tachas, pinos e semelhantes', aliq_interestadual: 12, aliq_interna: 23, mva: 36.56, multiplicador: 11.22 },
    { item: 3.0, nome: 'Sandalias Havaianas Brasil FC Azul Natal', valor: '10.324,80', ncm_sh: 64022000, cest: 'Não tem', descricao: 'Calçado com parte superior em tiras ou correias, fixados à sola por pregos, tachas, pinos e semelhantes', aliq_interestadual: 12, aliq_interna: 23, mva: 36.56, multiplicador: 11.22 },
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
