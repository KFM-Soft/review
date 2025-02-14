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
    registros: NCM[] = [];
    ncms: NCM[] = [];
    total: number = 0;
    paginaTamanho = 5;
    paginaIndex = 1;
    termoBusca: string = '';

    ngOnInit(): void {
        this.get()
    }

    get(): void {
        this.service.get().subscribe({
            next: (retorno: RespostaPaginada<NCM>) => {
                console.log("Retorno -> ", retorno)
                this.registros = retorno.content;
                this.ncms = retorno.content;
                console.log(this.registros)
                console.log(this.ncms)
            },
            error: (error) => {
                console.error('Erro ao carregar NCMs:', error);
            }
        })
    }

    atualizarTabela(): void {
        let filtro = this.ncms;

        if (this.termoBusca) {

            filtro = filtro.filter(produto =>
                produto.descricao?.toLowerCase().includes(this.termoBusca.toLowerCase())
                ||
                produto.cest?.toLowerCase().includes(this.termoBusca.toLowerCase())
                ||
                produto.ncm.toLowerCase().includes(this.termoBusca.toLowerCase())
            );
        }

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

    editarItem(registro: NCM) {
        console.log("Estou fazendo o set session", registro)
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
