import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AliquotaService } from '../../../services/aliquota.service';
import { Estado } from '../../../models/Estado';
import { EstadoService } from '../../../services/estado.service';
import { CommonModule } from '@angular/common';
import { Aliquota } from '../../../models/Aliquota';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StoragesService } from '../../../services/storages.service';
import { ETipoAlerta } from '../../../models/e-tipo-alerta';
import { AlertaService } from '../../../services/alerta.service';

@Component({
  selector: 'app-aliquota-form',
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
  templateUrl: './aliquota-form.component.html',
  styleUrl: './aliquota-form.component.scss'
})
export class AliquotaFormComponent implements OnInit{

  estados: Estado[] = []
  aliquota: Aliquota = <Aliquota>{};
  id: string | null = null;
  editavel: boolean = true;

  constructor(
    private service: AliquotaService,
    private estadoService: EstadoService,
    private storageService: StoragesService,
    private alertaService: AlertaService,
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
      this.aliquota = this.storageService.getSession("aliquota");
      this.editavel = false;
    }

  }

  submit(): void {
    this.aliquota.porcentagem =+ this.aliquota.porcentagem
    this.aliquota.sistema = true
    this.service.save(this.aliquota).subscribe({
      complete: () => {
        this.router.navigate(['../'], {relativeTo: this.route})
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: "Aliquota cadastrada com sucesso!"
        })
      }
    })

  }
}
