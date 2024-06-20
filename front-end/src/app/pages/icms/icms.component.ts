import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
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
  nome: string;
  data_expirar: string;
  button: boolean;
}

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
    NzPaginationModule
  ],
  templateUrl: './icms.component.html',
  styleUrls: ['./icms.component.scss']
})
export class IcmsComponent {
  empresas: Empresas[] = [
    { nome: 'Indústria LTDA', data_expirar: '05/11/2024', button: true },
    { nome: 'Indústria LTDA', data_expirar: '05/11/2024', button: true },
    { nome: 'Indústria LTDA', data_expirar: '05/11/2024', button: true },
    { nome: 'Indústria LTDA', data_expirar: '05/11/2024', button: true },
    { nome: 'Indústria LTDA', data_expirar: '05/11/2024', button: true },
    { nome: 'Indústria LTDA', data_expirar: '05/11/2024', button: true },
    { nome: 'Indústria LTDA', data_expirar: '05/11/2024', button: true },
    { nome: 'Indústria LTDA', data_expirar: '05/11/2024', button: true },
    { nome: 'Indústria LTDA', data_expirar: '05/11/2024', button: true },
    { nome: 'Indústria LTDA', data_expirar: '05/11/2024', button: true },
    { nome: 'Indústria LTDA', data_expirar: '05/11/2024', button: true },
    { nome: 'Indústria LTDA', data_expirar: '05/11/2024', button: true },
    { nome: 'Licença de EPP Disponível', data_expirar: '05/11/2024', button: false },
    { nome: 'Licença de EPP Disponível', data_expirar: '05/11/2024', button: false },
    { nome: 'Licença de EPP Disponível', data_expirar: '05/11/2024', button: false },
  ];

  displayData: Empresas[] = [];
  total = this.empresas.length;
  paginaTamanho = 5;
  paginaindex = 1;

  ngOnInit(): void {
    this.refreshDisplayData();
  }

  refreshDisplayData(): void {
    const startIndex = (this.paginaindex - 1) * this.paginaTamanho;
    const endIndex = startIndex + this.paginaTamanho;
    this.displayData = this.empresas.slice(startIndex, endIndex);
  }

  atulizarPagina(paginaindex: number): void {
    this.paginaindex = paginaindex;
    this.refreshDisplayData();
  }

  tamanhoPagina(paginaTamanho: number): void {
    this.paginaTamanho = paginaTamanho;
    this.refreshDisplayData();
  }
}
