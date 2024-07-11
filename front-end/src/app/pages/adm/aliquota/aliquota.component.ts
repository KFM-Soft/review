import { Component, OnInit, Renderer2 } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Aliquota } from '../../../models/Aliquota';
import { Observable } from 'rxjs';

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
    NzPaginationModule,
    NzInputModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './aliquota.component.html',
  styleUrl: './aliquota.component.scss'
})
export class AliquotaComponent implements OnInit {
  
  constructor(
    private renderer: Renderer2,
    private http: HttpClient,
  ) { }

  apiUrl = 'http://localhost:9000'

  registros: Aliquota[] = [];
  total: number = 0;
  paginaTamanho = 5;
  paginaIndex = 1;
  termoBusca: string = '';

  ngOnInit(): void {
    this.getAliquotas().subscribe({
      next: (retorno: Aliquota[]) => {
        console.log(retorno)
        this.registros = retorno
        console.log(this.registros)
      },
      error: (error) => {
        console.error('Erro ao carregar aliquotas:', error);
      }
    })
  }

  atualizarTabela(): void {
    let filtro = this.registros;

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

  getAliquotas(): Observable<Aliquota[]> {
    let url = this.apiUrl + '/aliquota/';
    return this.http.get<Aliquota[]>(url);
  }

}
