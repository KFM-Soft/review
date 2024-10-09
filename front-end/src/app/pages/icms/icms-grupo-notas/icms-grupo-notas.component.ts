import { IcmsService } from './../../../services/icms.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { IcmsNota } from '../../../models/IcmsNota';
import { Empresa } from '../../../models/Empresa';
import { EmpresasService } from '../../../services/empresas.service';
import { Relatorio } from '../../../models/Relatorio';
import { RelatorioService } from '../../../services/relatorio.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { response } from 'express';

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
export class IcmsGrupoNotasComponent implements OnInit {

  data: Empresa[] = [];
  notas: IcmsNota[] = [];
  relatorios: Relatorio[] = [];

  private token: string | null = null;
  url: SafeUrl | null = null;

  empresaId: number | null = null;
  empresa: Empresa = <Empresa>{}

  constructor(
    private route: ActivatedRoute,
    private icmsService: IcmsService,
    private empresaService: EmpresasService,
    private relatorioService: RelatorioService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.empresaId = +id;
      }
      this.token = window.sessionStorage?.getItem('token');
      this.getEmpresa()
      this.getIcmsRelatorios()
      console.log(this.relatorios)
    });
  }

  getEmpresa(): void {
    if(this.empresaId && this.token){
      this.empresaService.getId( this.token, this.empresaId).subscribe({
        next: (response: Empresa) => {
          this.empresa = response;
        },
      });

    }
  }

  getIcmsRelatorios(): void {
    if (this.empresaId) {
      this.relatorioService.getRelatorioEmpresaId(this.empresaId).subscribe({
        next: (response: Relatorio[]) => {
          this.relatorios = response;
        },
      });
    }
  }

  getPDF(relatorio_id: number): void{
    if(this.token)
      this.icmsService.getDownloadPDF(relatorio_id, this.token);
  }

};
