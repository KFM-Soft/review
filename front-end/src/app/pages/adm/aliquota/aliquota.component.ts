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
import { Aliquota } from '../../../models/Aliquota';
import { AliquotaService } from '../../../services/aliquota.service';
import { AdmComponent } from '../adm.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { StoragesService } from '../../../services/storages.service';
import { error } from 'console';

@Component({
  selector: 'app-aliquota',
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
  templateUrl: './aliquota.component.html',
  styleUrl: './aliquota.component.scss'
})
export class AliquotaComponent implements OnInit {
  
  constructor(
    private service: AliquotaService,
    private storageService: StoragesService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
  ) { }

  registros: Aliquota[] = [];
  aliquotas: Aliquota[] = [];
  total: number = 0;
  paginaTamanho = 5;
  paginaIndex = 1;
  termoBusca: string = '';

  ngOnInit(): void {
    this.service.get().subscribe({
      next: (retorno: Aliquota[]) => {
        this.registros = retorno;
        this.aliquotas = retorno;
      },
      error: (error) => {
        console.error('Erro ao carregar aliquotas:', error);
      }
    })
  }

  atualizarTabela(): void {
    let filtro = this.aliquotas;
    if (this.termoBusca) {
      filtro = filtro.filter(aliquota => 
        aliquota.origem.uf.toLowerCase().includes(this.termoBusca.toLowerCase()) 
          || 
          aliquota.destino.uf.toLowerCase().includes(this.termoBusca.toLowerCase())
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

  editarItem(registro: Aliquota){
    this.storageService.setSession('aliquota', registro);
    this.router.navigate(['./form'], {relativeTo: this.route, queryParams: {id: registro.id}});
  }

  excluirItem(registro: Aliquota){
    this.service.delete(registro).subscribe({
      complete: () => {
        alert("Registro excluido com sucesso.");
      }, error: (erro) => {
        console.error("Erro ao excluir:", erro);
        alert("Erro na exclusão!");
      }
    })
  }

}
