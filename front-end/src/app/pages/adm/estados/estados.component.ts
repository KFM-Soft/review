import { Component, OnInit, Renderer2 } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { Estado } from '../../../models/Estado';
import { EstadoService } from '../../../services/estado.service';
import { AdmComponent } from '../adm.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { StoragesService } from '../../../services/storages.service';
import { AlertaService } from '../../../services/alerta.service';
import { ETipoAlerta } from '../../../models/e-tipo-alerta';
import { RespostaPaginada } from '../../../models/resposta-paginada';
import { RequisicaoPagina } from '../../../models/requisicao-paginada';

@Component({
    selector: 'app-estado',
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
    templateUrl: './estados.component.html',
    styleUrl: './estados.component.scss'
})
export class EstadosComponent implements OnInit {

    constructor(
        private service: EstadoService,
        private storageService: StoragesService,
        private alertaService: AlertaService,
        private router: Router,
        private route: ActivatedRoute,
        private renderer: Renderer2,
    ) { }

    respostaPaginada: RespostaPaginada<Estado> = <RespostaPaginada<Estado>>{}
    requisicaoPaginada: RequisicaoPagina = new RequisicaoPagina();
    registros: Estado[] = [];
    estados: Estado[] = [];
    total: number = 0;
    paginaTamanho = 10;
    paginaIndex = 1;
    termoBusca: string = '';
    erroBusca: boolean = false;

    ngOnInit(): void {
        this.get()
    }

    get(): void {
        this.service.get(this.termoBusca, this.requisicaoPaginada).subscribe({
            next: (retorno: RespostaPaginada<Estado>) => {
                this.registros = retorno.content;
                this.estados = retorno.content;
                this.total = retorno.totalElements;
            },
            error: (error) => {
                console.error('Erro ao carregar estados:', error);
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

    editarItem(estado: Estado) {
        this.storageService.setSession('estado', estado);
        this.router.navigate(['./form'], { relativeTo: this.route, queryParams: { id: estado.id } });
    }

    excluirItem(registro: Estado) {
        this.service.delete(registro).subscribe({
            complete: () => {
                this.get();
                this.alertaService.enviarAlerta({
                    tipo: ETipoAlerta.SUCESSO,
                    mensagem: "Estado foi excluído com sucesso!"
                })
            }
        });
    }

}
