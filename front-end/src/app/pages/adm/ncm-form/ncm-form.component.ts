import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Estado } from '../../../models/Estado';
import { EstadoService } from '../../../services/estado.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { ActivatedRoute, Router } from '@angular/router';
import { StoragesService } from '../../../services/storages.service';
import { AlertaService } from '../../../services/alerta.service';
import { ETipoAlerta } from '../../../models/e-tipo-alerta';
import { NCM } from '../../../models/NCM';
import { NcmService } from '../../../services/ncm.service';

@Component({
  selector: 'app-Ncm-form',
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
  templateUrl: './ncm-form.component.html',
  styleUrl: './ncm-form.component.scss'
})
export class NcmFormComponent implements OnInit{

    estados: Estado[] = []
    NCM: NCM = <NCM>{};
    id: string | null = null;
    editavel: boolean = true;
    ncms: string[] = [];
  
    constructor(
      private service: NcmService,
      private estadoService: EstadoService,
      private storageService: StoragesService,
      private alertaService: AlertaService,
      private router: Router,
      private route: ActivatedRoute,
     ) { }
  
    ngOnInit(): void {
      this.estadoService.getTodos().subscribe({
        next: (retorno: Estado[]) => {
          this.estados = retorno
        }
      })
  
      this.id = this.route.snapshot.queryParamMap.get('id');
      if (this.id) {
        this.NCM = this.storageService.getSession("ncm");
        if(this.NCM.cest == null) this.NCM.cest = "";
        if(this.NCM.descricao == null) this.NCM.descricao = "";
        this.editavel = false;
      }
    }
  
    submit(): void {
      this.NCM.sistema = true
      this.NCM.ncm = this.NCM.ncm.replace(/\D/g, '');
      this.service.save(this.NCM).subscribe({
        complete: () => {
          this.router.navigate(['../'], {relativeTo: this.route})
          this.alertaService.enviarAlerta({
            tipo: ETipoAlerta.SUCESSO,
            mensagem: "NCM salvo com sucesso!"
          })
        }
      })
    }
  
  
  }