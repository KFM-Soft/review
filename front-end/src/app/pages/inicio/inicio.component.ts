import { EmpresasService } from './../../services/empresas.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Observable } from 'rxjs';
import { Empresa } from '../../models/Empresa';
import { Usuario } from '../../models/Usuario';
import { StoragesService } from '../../services/storages.service';
import { RespostaPaginada } from '../../models/resposta-paginada';
import { RequisicaoPagina } from '../../models/requisicao-paginada';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
    selector: 'app-inicio',
    standalone: true,
    imports: [
        CommonModule,
        NzIconModule,
        NzLayoutModule,
        NzMenuModule,
        NzBreadCrumbModule,
        NzCardModule,
        NzFlexModule,
        NzGridModule,
        FormsModule,
        NzTableModule,
        NzFlexModule,
        NzButtonModule,
        NzPaginationModule,
        NzInputModule,
        RouterLink
    ],
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {
    empresas: Observable<Empresa[]> | undefined;
    data: Empresa[] = Array<Empresa>();

    respostaPaginada: RespostaPaginada<Empresa> = <RespostaPaginada<Empresa>>{}
    requisicaoPaginada: RequisicaoPagina = new RequisicaoPagina();
    total: number = 0;
    paginaTamanho = 10;
    paginaIndex = 1;
    termoBusca: string = '';
    erroBusca: boolean = false;

    t = false;

    constructor(
        private storageService: StoragesService,
        private empresasService: EmpresasService,
    ) {
    }

    ngOnInit(): void {
        this.get();
    }

    get(): void {

        const userData = this.storageService.getSession('usuario') || '{}';
        const token = this.storageService.getSession('token') || '{}';
        const usuario: Usuario = JSON.parse(userData);

        this.empresasService.getEmpresasIdUsuario(token, usuario.id, this.termoBusca, this.requisicaoPaginada).subscribe({
            next: (response: RespostaPaginada<Empresa>) => {
                this.data = response.content
                this.total = response.totalElements
            }

        });

    }

    atualizarPagina(paginaindex: number): void {
        this.paginaIndex = paginaindex;
        this.requisicaoPaginada.page = paginaindex - 1;
        this.get();
    }

    tamanhoPagina(novoTamanho: number): void {
        this.paginaTamanho = novoTamanho;
        this.requisicaoPaginada.size = novoTamanho;
        this.requisicaoPaginada.page = 0;
        this.get();
    }

    buscar(): void {
        if (this.termoBusca.length < 3 && this.termoBusca.length != 0) {
            this.erroBusca = true;
            return;
        }
        this.erroBusca = false;
        this.get();
    }
}
