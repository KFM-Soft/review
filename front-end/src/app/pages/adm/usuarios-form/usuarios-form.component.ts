import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { StoragesService } from '../../../services/storages.service';
import { AlertaService } from '../../../services/alerta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ETipoAlerta } from '../../../models/e-tipo-alerta';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios-form',
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
  templateUrl: './usuarios-form.component.html',
  styleUrl: './usuarios-form.component.scss'
})
export class UsuariosFormComponent implements OnInit{

  usuario: Usuario = <Usuario>{};
  id: string | null = null;
  editavel: boolean = true;

  constructor(
    private service: UsuarioService,
    private storageService: StoragesService,
    private alertaService: AlertaService,
    private router: Router,
    private route: ActivatedRoute,
   ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this.usuario = this.storageService.getSession("Usuario");
    }

  }

  submit(): void {
    this.service.save(this.usuario).subscribe({
      complete: () => {
        this.router.navigate(['../'], {relativeTo: this.route})
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: "Usuario cadastrado com sucesso!"
        })
      }
    })
  }
}
