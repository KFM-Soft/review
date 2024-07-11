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
    FormsModule,
  ],
  templateUrl: './aliquota-form.component.html',
  styleUrl: './aliquota-form.component.scss'
})
export class AliquotaFormComponent implements OnInit{

  estados: Estado[] = []
  aliquota: Aliquota = <Aliquota>{};

  constructor(
    private service: AliquotaService,
    private estadoService: EstadoService,
   ) { }

  ngOnInit(): void {
    this.estadoService.getEstados().subscribe({
      next: (retorno: Estado[]) => {
        this.estados = retorno
      }
    })
  }

  submit(): void {
    this.aliquota.porcentagem = +this.aliquota.porcentagem
    this.service.postAliquota(this.aliquota).subscribe({})
  }

}
