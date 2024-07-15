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

interface produtos {
  item: Number;
  nome: string;
  valor: string;
  ncm_sh: Number;
  cest: String;
  descricao: String;
  depois_calc: string;
  economia: string;
  economia_porc: string;
  
}

@Component({
  selector: 'app-icms-detalhes-nota',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, NzBreadCrumbModule, NzCardModule, NzFlexModule, NzTableModule, NzFlexModule, NzButtonModule,NzPaginationModule, RouterLink,],
  templateUrl: './icms-detalhes-nota.component.html',
  styleUrl: './icms-detalhes-nota.component.scss'
})
export class IcmsDetalhesNotas {
  produtos: produtos[] = [
    { item: 1.0, nome: 'Sandalias Havaianas Brasil FC Azul Natal', valor: '10.324,80', ncm_sh: 64022000, cest: 'Não tem', descricao: 'Calçado com parte superior em tiras ou correias, fixados à sola por pregos, tachas, pinos e semelhantes', depois_calc: '333.00', economia: '21.00', economia_porc: '5,90'},
    { item: 2.0, nome: 'Sandalias Havaianas Brasil FC Azul Natal', valor: '10.324,80', ncm_sh: 64022000, cest: 'Não tem', descricao: 'Calçado com parte superior em tiras ou correias, fixados à sola por pregos, tachas, pinos e semelhantes', depois_calc: '333.00', economia: '21.00', economia_porc: '5,90'},
  ];

  registros: produtos[] = [];
  total = this.produtos.length;
  paginaTamanho = 5;
  paginaIndex = 1;
  termoBusca: string = '';
  selectTag: string = '';

  ngOnInit(): void {
    this.atualizarTabela();
  }

  atualizarTabela(): void {
    let filtro = this.produtos;
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
