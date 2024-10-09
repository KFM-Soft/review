import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProdutosService } from '../../../services/produtos.service';
import { Estado } from '../../../models/Estado';
import { EstadoService } from '../../../services/estado.service';
import { CommonModule } from '@angular/common';
import { Produto } from '../../../models/Produto';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { ActivatedRoute, Router } from '@angular/router';
import { StoragesService } from '../../../services/storages.service';

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
  id: string | null = null;
  editavel: boolean = true;

  constructor(
    private service: ProdutosService,
    private estadoService: EstadoService,
    private storageService: StoragesService,
    private router: Router,
    private route: ActivatedRoute,
   ) { }

  ngOnInit(): void {
    this.estadoService.get().subscribe({
      next: (retorno: Estado[]) => {
        this.estados = retorno
      }
    })
    
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this.produto = this.storageService.getSession("produto");
      this.editavel = false;
    }
  }

  submit(): void {
    this.produto.sistema = true
    this.service.save(this.produto).subscribe({
      next: () => {
        alert("Registro salvo com sucesso!")
        this.router.navigate(['../'], {relativeTo: this.route})
      }
    })
  }

}
