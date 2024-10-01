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
import { Produto } from '../../../models/Produto';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AliquotaService } from '../../../services/aliquota.service';
import { ProdutosService } from '../../../services/produtos.service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

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
    private produtosService: ProdutosService,
    private storageService: StoragesService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
  ) { }

  registros: Multiplicador[] = [];
  multiplicadores: Multiplicador[] = [];
  aliquota: Aliquota = <Aliquota>{};
  aliquotas: Aliquota[] = [];
  produto: Produto = <Produto>{};
  produtos: Produto[] = [];
  total: number = 0;
  paginaTamanho = 5;
  paginaIndex = 1;
  termoBusca: string = '';

  ngOnInit(): void {
    this.getAliquotas();
    this.getProdutos();
    this.getMultiplicadores();
  }

  getMultiplicadores() {
    this.service.get().subscribe({
      next: (retorno: Multiplicador[]) => {
        this.registros = retorno
        this.total = retorno.length;
      },
      error: (error) => {
        console.error("Erro ao buscar multiplicadores: ", error);
      }
    })
  }

  getAliquotas() {
    this.aliquotaService.get().subscribe({
      next: (retorno: Aliquota[]) => {
        this.aliquotas = retorno;
      },
      error: (error) => {
        console.error("Erro ao buscar aliquotas: ", error);
      }
    })
  }

  getProdutos() {
    this.produtosService.get().subscribe({
      next: (retorno: Produto[]) => {
        this.produtos = retorno;
      },
      error: (error) => {
        console.error("Erro ao buscar produtos: ", error);
      }
    })
  }

  atualizarTabela(): void {
    let filtro = this.multiplicadores;
    if (this.termoBusca) {
      filtro = filtro.filter(multiplicador => 
        multiplicador.produto.descricao.toLowerCase().includes(this.termoBusca.toLowerCase()) 
          || 
          multiplicador.mvaOriginal.toString().toLowerCase().includes(this.termoBusca.toLowerCase())
          || 
          multiplicador.mvaAjustada?.toString().toLowerCase().includes(this.termoBusca.toLowerCase())
          || 
          multiplicador.multiplicadorOriginal?.toString().toLowerCase().includes(this.termoBusca.toLowerCase())
          || 
          multiplicador.multiplicadorAjustado?.toString().toLowerCase().includes(this.termoBusca.toLowerCase())
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

  buscar() {
    if(!(this.aliquota) || !(this.produto)) return false;
    if(!(Object.keys(this.aliquota).length > 0 && Object.keys(this.produto).length > 0)) return false;
    console.log(this.produto, this.aliquota)
    console.log(this.produto.id, this.aliquota.id)
    this.service.getByAliquotaAndProduto(this.produto, this.aliquota).subscribe({
      next: (retorno: Multiplicador[]) => {
        this.multiplicadores = retorno;
        this.atualizarTabela();
      }
    })

    return true;
  }

  editarItem(multiplicador: Multiplicador){
    this.storageService.setSession('multiplicador', multiplicador);
    this.router.navigate(['./form'], {relativeTo: this.route, queryParams: {id: multiplicador.id}});
  }

  excluirItem(registro: Multiplicador){
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
