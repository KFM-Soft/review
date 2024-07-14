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

interface gruposNotas {
  numero: Number;
  data_processamento: string;
  valor: string;
  imposto: string;
  notasProcessadas: Number;
  button: boolean
}

@Component({
  selector: 'app-icms-grupo-notas',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, NzBreadCrumbModule, NzCardModule, NzFlexModule, NzTableModule, NzFlexModule, NzButtonModule,NzPaginationModule, RouterLink,],
  templateUrl: './icms-grupo-notas.component.html',
  styleUrl: './icms-grupo-notas.component.scss'
})
export class IcmsGrupoNotasComponent {
  gruposNotas: gruposNotas[] = [
    { numero: 1, data_processamento: '02/04/2024', valor: '5.000,00', imposto: '530,00', notasProcessadas: 575, button: true},
    { numero: 1, data_processamento: '02/04/2024', valor: '5.000,00', imposto: '530,00', notasProcessadas: 575, button: true},
    { numero: 1, data_processamento: '02/04/2024', valor: '5.000,00', imposto: '530,00', notasProcessadas: 575, button: true},
    { numero: 1, data_processamento: '02/04/2024', valor: '5.000,00', imposto: '530,00', notasProcessadas: 575, button: true},
    { numero: 1, data_processamento: '02/04/2024', valor: '5.000,00', imposto: '530,00', notasProcessadas: 575, button: true},
    { numero: 1, data_processamento: '02/04/2024', valor: '5.000,00', imposto: '530,00', notasProcessadas: 575, button: true},
  ];

  registros: gruposNotas[] = [];
  total = this.gruposNotas.length;
  paginaTamanho = 5;
  paginaIndex = 1;
  termoBusca: string = '';
  selectTag: string = '';

  ngOnInit(): void {
    this.atualizarTabela();
  };

  atualizarTabela(): void {
    let filtro = this.gruposNotas;
    this.total = filtro.length;
    const startIndex = (this.paginaIndex - 1) * this.paginaTamanho;
    const endIndex = startIndex + this.paginaTamanho;
    this.registros = filtro.slice(startIndex, endIndex);
  };

  atualizarPagina(paginaindex: number): void {
    this.paginaIndex = paginaindex;
    this.atualizarTabela();
  }

  tamanhoPagina(paginaTamanho: number): void {
    this.paginaTamanho = paginaTamanho;
    this.atualizarTabela();
  }
}