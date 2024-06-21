import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
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
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, NgForm } from '@angular/forms';
interface Empresas {
  nome: string;
  data_expirar: string;
  button: boolean;
  tag: string;
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
    NzPaginationModule,
    NzInputModule,
    NzSelectModule,
    FormsModule,
  ],
  templateUrl: './icms-home.component.html',
  styleUrls: ['./icms-home.component.scss']
})
export class IcmsHomeComponent {
  empresas: Empresas[] = [
    { nome: 'Tech Innovators Ltd', data_expirar: '15/09/2024', button: true, tag: 'tecnologia' },
    { nome: 'Green Energy Corp', data_expirar: '27/04/2024', button: true, tag: 'agricola'  },
    { nome: 'Future Solutions LLC', data_expirar: '11/11/2024', button: true, tag: 'tecnologia'  },
    { nome: 'Apex Industries', data_expirar: '03/12/2024', button: true, tag: 'tecnologia'  },
    { nome: 'NextGen Enterprises', data_expirar: '19/01/2025', button: true, tag: 'tecnologia'  },
    { nome: 'Global Ventures Inc', data_expirar: '05/07/2024', button: true, tag: 'agricola'  },
    { nome: 'Prime Logistics', data_expirar: '22/08/2024', button: true, tag: 'mercado'  },
    { nome: 'EcoWorld Co', data_expirar: '14/10/2024', button: true, tag: 'agricola'  },
    { nome: 'BlueSky Holdings', data_expirar: '29/06/2024', button: true, tag: 'tecnologia'  },
    { nome: 'Visionary Tech Ltd', data_expirar: '21/03/2024', button: true, tag: 'tecnologia'  },
    { nome: 'Smart Solutions Group', data_expirar: '06/02/2024', button: true, tag: 'tecnologia'  },
    { nome: 'Infinity Networks', data_expirar: '18/05/2024', button: true, tag: 'mercado' },
    { nome: 'Licença de EPP Disponível', data_expirar: '05/11/2024', button: false, tag: 'registrar' },
    { nome: 'Licença de EPP Disponível', data_expirar: '05/11/2024', button: false, tag: 'registrar' },
    { nome: 'Licença de EPP Disponível', data_expirar: '05/11/2024', button: false, tag: 'registrar' },
  ];

  registros: Empresas[] = [];
  total = this.empresas.length;
  paginaTamanho = 5;
  paginaIndex = 1;
  termoBusca: string = '';
  selectTag: string = '';

  ngOnInit(): void {
    this.atualizarTabela();
  }

  atualizarTabela(): void {
    let filtro = this.empresas;

    if (this.termoBusca) {
      filtro = filtro.filter(empresa => 
        empresa.nome.toLowerCase().includes(this.termoBusca.toLowerCase())
      );
    }

    if (this.selectTag) {
      filtro = filtro.filter(empresa => empresa.tag === this.selectTag);
    }

    this.total = filtro.length;
    const startIndex = (this.paginaIndex - 1) * this.paginaTamanho;
    const endIndex = startIndex + this.paginaTamanho;
    this.registros = filtro.slice(startIndex, endIndex);
  }

  atulizarPagina(paginaindex: number): void {
    this.paginaIndex = paginaindex;
    this.atualizarTabela();
  }

  tamanhoPagina(paginaTamanho: number): void {
    this.paginaTamanho = paginaTamanho;
    this.atualizarTabela();
  }
}
