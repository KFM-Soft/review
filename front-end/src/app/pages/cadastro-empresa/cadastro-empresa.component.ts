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
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';

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
  usuarios: Usuario[] = [];
  id: string | null = null;
  editavel: boolean = true;
  precos: Precificacao[] = [];

  constructor (
    private service: EmpresasService,
    private usuarioService: UsuarioService,
    private precificacao: PrecificacaoService,
    private storageService: StoragesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.getUsuarios();
    if (this.id) {
      this.empresa = this.storageService.getSession("empresa");
      this.editavel = false;
    } else {
      this.getPrecificacao();
    }
  }

  getUsuarios() {
    this.usuarioService.get().subscribe({
      next: (retorno: Usuario[]) => {
        this.usuarios = retorno
      },
      error: (error) => {
        console.error("Erro ao buscar usuários: ", error);
      }
    })
  }

  getPrecificacao() {
    this.precificacao.get().subscribe({
      next: (retorno: Precificacao[]) => {
        this.precos = retorno
      },
      error: (error) => {
        console.error("Erro ao buscar precificações: ", error);
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
