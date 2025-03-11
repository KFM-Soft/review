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
import { Multiplicador } from '../../../models/Multiplicador';
import { MultiplicadorService } from '../../../services/multiplicador.service';
import { AdmComponent } from '../adm.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { StoragesService } from '../../../services/storages.service';
import { Aliquota } from '../../../models/Aliquota';
import { NCM } from '../../../models/NCM';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AliquotaService } from '../../../services/aliquota.service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AlertaService } from '../../../services/alerta.service';
import { ETipoAlerta } from '../../../models/e-tipo-alerta';
import { NcmService } from '../../../services/ncm.service';
import { RespostaPaginada } from '../../../models/resposta-paginada';
import { RequisicaoPagina } from '../../../models/requisicao-paginada';

@Component({
    selector: 'app-multiplicador',
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
        NzSelectModule,
        NzToolTipModule,
    ],
    templateUrl: './multiplicadores.component.html',
    styleUrl: './multiplicadores.component.scss'
})
export class MultiplicadoresComponent implements OnInit {

    constructor(
        private service: MultiplicadorService,
        private aliquotaService: AliquotaService,
        private ncmService: NcmService,
        private storageService: StoragesService,
        private alertaService: AlertaService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    respostaPaginada: RespostaPaginada<NCM> = <RespostaPaginada<NCM>>{}
    requisicaoPaginada: RequisicaoPagina = new RequisicaoPagina();
    registros: Multiplicador[] = [];
    multiplicadores: Multiplicador[] = [];
    aliquota: Aliquota = <Aliquota>{};
    aliquotas: Aliquota[] = [];
    ncm: NCM = <NCM>{};
    lista_ncms: NCM[] = [];
    total: number = 0;
    paginaTamanho = 10;
    paginaIndex = 1;
    termoBusca: string = '';
    erroBusca: boolean = false;

    ngOnInit(): void {
        this.getAliquotas();
        this.getNcms();
        this.getMultiplicadores();
    }

    getMultiplicadores() {
        this.service.getDoSistema().subscribe({
            next: (retorno: RespostaPaginada<Multiplicador>) => {
                this.registros = retorno.content;
                this.multiplicadores = retorno.content;
                this.total = retorno.totalElements;
            },
            error: (error) => {
                console.error("Erro ao buscar multiplicadores: ", error);
            }
        })
    }

    getAliquotas() {
        this.aliquotaService.getTodos().subscribe({
            next: (retorno: Aliquota[]) => {
                this.aliquotas = retorno;
            },
            error: (error) => {
                console.error("Erro ao buscar aliquotas: ", error);
            }
        })
    }

    getNcms() {
        this.ncmService.get().subscribe({
            next: (retorno: RespostaPaginada<NCM>) => {
                this.lista_ncms = retorno.content;
            },
            error: (error) => {
                console.error("Erro ao buscar ncms: ", error);
            }
        })
    }


    atualizarPagina(paginaindex: number): void {
        this.paginaIndex = paginaindex;
        this.requisicaoPaginada.page = paginaindex - 1;
        this.getMultiplicadores();
    }

    tamanhoPagina(novoTamanho: number): void {
        this.paginaTamanho = novoTamanho;
        this.requisicaoPaginada.size = novoTamanho;
        this.requisicaoPaginada.page = 0;
        this.getMultiplicadores();
    }

    buscar() {
        if (!(this.aliquota) || !(this.ncm)) return false;
        if (!(Object.keys(this.aliquota).length > 0 && Object.keys(this.ncm).length > 0)) return false;
        this.service.getByAliquotaAndProduto(this.ncm, this.aliquota).subscribe({
            next: (retorno: Multiplicador[]) => {
                this.multiplicadores = retorno;
                // this.atualizarTabela();
            }
        })

        return true;
    }

    editarItem(multiplicador: Multiplicador) {
        this.storageService.setSession('multiplicador', multiplicador);
        this.router.navigate(['./form'], { relativeTo: this.route, queryParams: { id: multiplicador.id } });
    }

    excluirItem(registro: Multiplicador) {
        this.service.delete(registro).subscribe({
            complete: () => {
                this.getAliquotas();
                this.getNcms();
                this.getMultiplicadores();
                this.alertaService.enviarAlerta({
                    tipo: ETipoAlerta.SUCESSO,
                    mensagem: "Multiplicador foi excluído com sucesso!"
                })
            }
        });
    }

}
