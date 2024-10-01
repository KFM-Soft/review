import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
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
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { IcmsProduto } from '../../../models/IcmsProduto';
import { IcmsService } from '../../../services/icms.service';

@Component({
  selector: 'app-icms-detalhes-nota',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, NzBreadCrumbModule, NzCardModule, NzFlexModule, NzTableModule, NzFlexModule, NzButtonModule, NzPaginationModule, RouterLink, NzGridModule, NzInputModule, FormsModule, NzInputNumberModule, NzDividerModule],
  templateUrl: './icms-detalhes-nota.component.html',
  styleUrl: './icms-detalhes-nota.component.scss'
})
export class IcmsDetalhesNotas {


  private token: string | null = null;
  private sessionStorage: Storage | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: IcmsService,
    private storageService: StoragesService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    if(typeof window !== 'undefined') {
      this.sessionStorage = window.sessionStorage;
    }
   }

  notas: IcmsNota[] = [];
  registros: IcmsNota[] = [];
  items_qtd: number[] = []
  total = this.notas.length;
  paginaTamanho = 5;
  paginaIndex = 1;
  termoBusca: string = '';
  selectTag: string = '';

  ngOnInit(): void {
    this.notas = this.storageService.getSession('notasCalculadas')
    this.registros = this.storageService.getSession('notasCalculadas')
    if (this.registros)
      this.items_qtd = this.registros.map((_, index) => index + 1);
    if (isPlatformBrowser(this.platformId)) {
      this.token = window.sessionStorage?.getItem('token');
    }
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

  trackByFn(index: any, item: any) {
    return index;
  }

  mudancaAliquotaInterestadual(produto: IcmsProduto) {
    produto.valorIcms = produto.valorProduto * (produto.aliquotaInterestadual / 100)
    this.mudancaResultado(produto)
  }

  mudancaAliquotaInterna(produto: IcmsProduto) {
    produto.baseSTComAliquotaInterna = produto.baseST * (produto.aliquotaInternaEmit / 100)
    this.mudancaResultado(produto)
  }

  mudancaMVA(produto: IcmsProduto) {
    produto.prodMva = produto.valorProduto * (produto.mva / 100)
    produto.baseST = produto.valorProduto + produto.prodMva
    produto.baseSTComAliquotaInterna = produto.baseST * (produto.aliquotaInternaEmit / 100)
    this.mudancaResultado(produto)
  }

  mudancaResultado(produto: IcmsProduto) {
    produto.resultadoIcmsST = produto.baseSTComAliquotaInterna - produto.valorIcms
  }

  gerarPDF() {
    if(this.token){
      this.service.download(this.notas, this.token)
    }
   
  }

}