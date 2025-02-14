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
import { NCM } from '../../../models/NCM';
import { AdmComponent } from '../adm.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { StoragesService } from '../../../services/storages.service';
import { AlertaService } from '../../../services/alerta.service';
import { ETipoAlerta } from '../../../models/e-tipo-alerta';
import { NcmService } from '../../../services/ncm.service';
import { RespostaPaginada } from '../../../models/resposta-paginada';
import { RequisicaoPagina } from '../../../models/requisicao-paginada';

@Component({
    selector: 'app-Ncm',
    standalone: true,
    imports: [
        CommonModule,
        NzMenuModule,
        NzLayoutModule,
        NzIconModule,
        NzFlexModule,
        NzTableModule,
        NzButtonModule,
        NzPaginationModule,
        NzInputModule,
        NzGridModule,
        FormsModule,
        RouterLink,
        AdmComponent,
    ],
    templateUrl: './ncm.component.html',
    styleUrl: './ncm.component.scss'
})
export class NcmComponent implements OnInit {

    constructor(
        private renderer: Renderer2,
        private service: NcmService,
        private storageService: StoragesService,
        private alertaService: AlertaService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    respostaPaginada: RespostaPaginada<NCM> = <RespostaPaginada<NCM>>{}
    requisicaoPaginada: RequisicaoPagina = new RequisicaoPagina();
    registros: NCM[] = [];
    ncms: NCM[] = [];
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
            next: (retorno: RespostaPaginada<NCM>) => {
                console.log(retorno)
                this.registros = retorno.content;
                this.ncms = retorno.content;
                this.total = retorno.totalElements;
            },
            error: (error) => {
                console.error('Erro ao carregar NCMs:', error);
            }
        })
    }

    atualizarPagina(paginaindex: number): void {
        this.paginaIndex = paginaindex;
        this.requisicaoPaginada.page = paginaindex - 1;
        this.get();
    }

    tamanhoPagina(novoTamanho: number): void {
        this.paginaTamanho = novoTamanho;          // Atualiza a variável vinculada ao nz-pagination
        this.requisicaoPaginada.size = novoTamanho;  // Atualiza a requisição para o backend
        this.requisicaoPaginada.page = 0;            // Opcional: reinicia para a primeira página
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

    editarItem(registro: NCM) {
        this.storageService.setSession('ncm', registro);
        this.router.navigate(['./form'], { relativeTo: this.route, queryParams: { id: registro.id } });
    }

    excluirItem(registro: NCM) {
        this.service.delete(registro).subscribe({
            next: () => {
                this.get()
            },
            complete: () => {
                this.alertaService.enviarAlerta({
                    tipo: ETipoAlerta.SUCESSO,
                    mensagem: "NCM foi excluído com sucesso!"
                })
            }
        });
    }

}
