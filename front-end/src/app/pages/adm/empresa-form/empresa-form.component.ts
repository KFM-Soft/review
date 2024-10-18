import { Component } from '@angular/core';
import { Empresa } from '../../../models/Empresa';
import { Usuario } from '../../../models/Usuario';
import { Precificacao } from '../../../models/Precificacao';
import { EmpresasService } from '../../../services/empresas.service';
import { UsuarioService } from '../../../services/usuario.service';
import { PrecificacaoService } from '../../../services/precificacao.service';
import { StoragesService } from '../../../services/storages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { AlertaService } from '../../../services/alerta.service';
import { ETipoAlerta } from '../../../models/e-tipo-alerta';

@Component({
  selector: 'app-empresa-form',
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
  templateUrl: './empresa-form.component.html',
  styleUrl: './empresa-form.component.scss'
})
export class EmpresaFormComponent {
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
    private route: ActivatedRoute,
    private alertaService: AlertaService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.getUsuarios();
    this.getPrecificacao();
    if (this.id) {
      this.empresa = this.storageService.getSession("empresa");
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
      complete: () => {
        this.router.navigate(['../'], {relativeTo: this.route})
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: "Empresa cadastrada com sucesso!"
        })
      }
    })
  }
}
