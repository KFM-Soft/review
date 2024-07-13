import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProdutoService } from '../../../services/produtos.service';
import { Estado } from '../../../models/Estado';
import { EstadoService } from '../../../services/estado.service';
import { CommonModule } from '@angular/common';
import { Produto } from '../../../models/Produto';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-Produto-form',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzInputNumberModule,
    FormsModule,
  ],
  templateUrl: './produtos-form.component.html',
  styleUrl: './produtos-form.component.scss'
})
export class ProdutoFormComponent implements OnInit{

  estados: Estado[] = []
  produto: Produto = <Produto>{};

  constructor(
    private service: ProdutoService,
    private estadoService: EstadoService,
    private router: Router,
    private route: ActivatedRoute,
   ) { }

  ngOnInit(): void {
    this.estadoService.getEstados().subscribe({
      next: (retorno: Estado[]) => {
        this.estados = retorno
      }
    })
  }

  submit(): void {
    this.service.saveProduto(this.produto).subscribe({
      next: () => {
        alert("Aliquota salva com sucesso!")
        this.router.navigate(['../'], {relativeTo: this.route})
      }
    })
  }

}
