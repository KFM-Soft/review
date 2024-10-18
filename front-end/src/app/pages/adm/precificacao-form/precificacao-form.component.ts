import { Component } from '@angular/core';
import { PrecificacaoService } from '../../../services/precificacao.service';
import { StoragesService } from '../../../services/storages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Precificacao } from '../../../models/Precificacao';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { AlertaService } from '../../../services/alerta.service';
import { ETipoAlerta } from '../../../models/e-tipo-alerta';
@Component({
  selector: 'app-precificacao-form',
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
  templateUrl: './precificacao-form.component.html',
  styleUrl: './precificacao-form.component.scss'
})
export class PrecificacaoFormComponent {
  precificacao: Precificacao = <Precificacao>{};
  id: string | null = null;
  editavel: boolean = true;

  constructor(
    private service: PrecificacaoService,
    private storageService: StoragesService,
    private alertaService: AlertaService,
    private router: Router,
    private route: ActivatedRoute,
   ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this.precificacao = this.storageService.getSession("precificacao");
      this.editavel = false;
    }

  }

  submit(): void {
    this.service.save(this.precificacao).subscribe({
      complete: () => {
        this.router.navigate(['../'], {relativeTo: this.route})
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: "Precificação cadastrada com sucesso!"
        })
      }
    })
  }
}
