import { StoragesService } from './../../services/storages.service';
import { Component } from '@angular/core';
import { Empresa } from '../../models/Empresa';
import { Precificacao } from '../../models/Precificacao';
import { EmpresasService } from '../../services/empresas.service';
import { PrecificacaoService } from '../../services/precificacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-empresa',
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
  templateUrl: './cadastro-empresa.component.html',
  styleUrl: './cadastro-empresa.component.scss'
})
export class CadastroEmpresaComponent {
  empresa: Empresa = <Empresa>{};
  id: string | null = null;
  editavel: boolean = true;
  preco: Precificacao[] = [];

  constructor (
    private service: EmpresasService,
    private precificacao: PrecificacaoService,
    private storageService: StoragesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this.empresa = this.storageService.getSession("empresa");
      this.editavel = false;
    } else {
      this.getPrecificacao();
    }
  }

  getPrecificacao() {
    this.precificacao.get().subscribe({
      next: (retorno: Precificacao[]) => {
        this.preco = retorno
      }
    })
  }

  submit(): void {
    this.service.save(this.empresa).subscribe({
      next: () => {
        alert("Empresa Cadastrada com Sucesso!")
        this. router.navigate(['../'], {relativeTo: this.route})
      }
    })
  }
}
