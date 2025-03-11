import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { EmpresasService } from '../../../services/empresas.service';
import { StoragesService } from '../../../services/storages.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Empresa } from '../../../models/Empresa';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { AdmComponent } from '../adm.component';
import { RespostaPaginada } from '../../../models/resposta-paginada';
import { Estado } from '../../../models/Estado';
import { RequisicaoPagina } from '../../../models/requisicao-paginada';

@Component({
    selector: 'app-empresa',
    standalone: true,
    imports: [
        CommonModule,
        NzMenuModule,
        NzLayoutModule,
        NzIconModule,
        NzFlexModule,
        NzTableModule,
        NzButtonModule,
        NzGridModule,
        NzPaginationModule,
        NzInputModule,
        FormsModule,
        RouterLink,
        AdmComponent,
    ],
    templateUrl: './empresa.component.html',
    styleUrl: './empresa.component.scss'
})
export class EmpresaComponent {
    constructor(
        private service: EmpresasService,
        private storageService: StoragesService,
        private router: Router,
        private route: ActivatedRoute,
        private renderer: Renderer2,
    ) { }

    respostaPaginada: RespostaPaginada<Estado> = <RespostaPaginada<Estado>>{}
    requisicaoPaginada: RequisicaoPagina = new RequisicaoPagina();
    registros: Empresa[] = [];
    empresas: Empresa[] = [];
    total: number = 0;
    paginaTamanho = 10;
    paginaIndex = 1;
    termoBusca: string = '';
    erroBusca: boolean = false;

    private token: string | null = null;

    ngOnInit(): void {

        this.token = this.storageService.getSession('token');
        if (!this.token) {
            this.router.navigate(['./login'], { relativeTo: this.route });
        }
        this.get();
    }

    get() {
        this.service.get(this.token!, this.termoBusca, this.requisicaoPaginada).subscribe({
            next: (retorno: RespostaPaginada<Empresa>) => {
                this.registros = retorno.content;
                this.empresas = retorno.content;
                this.total = retorno.totalElements;

            },
            error: (error) => {
                console.error('Erro ao carregar empresas:', error);
            }
        })
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

    editarItem(registro: Empresa) {
        this.storageService.setSession('empresa', registro);
        this.router.navigate(['./form'], { relativeTo: this.route, queryParams: { id: registro.id } });
    }

    excluirItem(registro: Empresa) {
        this.service.delete(registro).subscribe({
            complete: () => {
                alert("Registro excluido com sucesso.");
                window.location.reload();
            }, error: (erro) => {
                alert("Erro na exclusão!");
                window.location.reload();
            }
        })
    }
}
