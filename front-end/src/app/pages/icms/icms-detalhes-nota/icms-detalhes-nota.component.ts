import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { StoragesService } from '../../../services/storages.service';
import { IcmsNota } from '../../../models/IcmsNota';


@Component({
  selector: 'app-icms-detalhes-nota',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, NzBreadCrumbModule, NzCardModule, NzFlexModule, NzTableModule, NzFlexModule, NzButtonModule,NzPaginationModule, RouterLink, NzGridModule],
  templateUrl: './icms-detalhes-nota.component.html',
  styleUrl: './icms-detalhes-nota.component.scss'
})
export class IcmsDetalhesNotas {

  constructor ( 
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StoragesService,
  ) {}
  
  notas: IcmsNota[] = [];
  registros: IcmsNota[] = [];
  total = this.notas.length;
  paginaTamanho = 5;
  paginaIndex = 1;
  termoBusca: string = '';
  selectTag: string = '';

  ngOnInit(): void {
    this.notas = this.storageService.getSession('notasCalculadas')
    this.registros = this.storageService.getSession('notasCalculadas')
  }

  atualizarTabela(): void {
    let filtro = this.notas;
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
