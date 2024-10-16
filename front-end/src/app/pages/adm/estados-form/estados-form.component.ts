import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { EstadoService } from '../../../services/estado.service';
import { Estado } from '../../../models/Estado';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StoragesService } from '../../../services/storages.service';
import { AlertaService } from '../../../services/alerta.service';
import { ETipoAlerta } from '../../../models/e-tipo-alerta';

@Component({
  selector: 'app-estado-form',
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
  templateUrl: './estados-form.component.html',
  styleUrl: './estados-form.component.scss'
})
export class EstadosFormComponent implements OnInit{

  estado: Estado = <Estado>{};
  id: string | null = null;
  editavel: boolean = true;

  constructor(
    private service: EstadoService,
    private storageService: StoragesService,
    private alertaService: AlertaService,
    private router: Router,
    private route: ActivatedRoute,
   ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this.estado = this.storageService.getSession("estado");
      this.editavel = false;
    }

  }

  submit(): void {
    this.service.save(this.estado).subscribe({
      complete: () => {
        this.router.navigate(['../'])
        this.alertaService.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: "Estado cadastrado com sucesso!"
        })
      }
    })
  }

}
