import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MultiplicadorService } from '../../../services/multiplicador.service';
import { Multiplicador } from '../../../models/Multiplicador';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StoragesService } from '../../../services/storages.service';
import { NCM } from '../../../models/NCM';
import { Aliquota } from '../../../models/Aliquota';
import { AliquotaService } from '../../../services/aliquota.service';
import { AlertaService } from '../../../services/alerta.service';
import { ETipoAlerta } from '../../../models/e-tipo-alerta';
import { NcmService } from '../../../services/ncm.service';
import { RespostaPaginada } from '../../../models/resposta-paginada';

@Component({
    selector: 'app-multiplicador-form',
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
    templateUrl: './multiplicadores-form.component.html',
    styleUrl: './multiplicadores-form.component.scss'
})
export class MultiplicadoresFormComponent implements OnInit {

    multiplicador: Multiplicador = <Multiplicador>{};
    ncms: NCM[] = [];
    aliquotas: Aliquota[] = [];
    id: string | null = null;
    editavel: boolean = true;

    constructor(
        private service: MultiplicadorService,
        private ncmService: NcmService,
        private aliquotaService: AliquotaService,
        private storageService: StoragesService,
        private alertaService: AlertaService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.queryParamMap.get('id');
        if (this.id) {
            this.multiplicador = this.storageService.getSession("multiplicador");
            this.editavel = false;
        } else {
            this.getProdutos();
            this.getAliquotas();
        }

    }

    getProdutos() {
        this.ncmService.get().subscribe({
            next: (retorno: RespostaPaginada<NCM>) => {
                this.ncms = retorno.content
            }
        })
    }

    getAliquotas() {
        this.aliquotaService.getTodos().subscribe({
            next: (retorno: Aliquota[]) => {
                this.aliquotas = retorno
            }
        })
    }

    submit(): void {
        this.multiplicador.sistema = true
        this.service.save(this.multiplicador).subscribe({
            complete: () => {
                this.router.navigate(['../'], { relativeTo: this.route })
                this.alertaService.enviarAlerta({
                    tipo: ETipoAlerta.SUCESSO,
                    mensagem: "Multiplicador cadastrado com sucesso!"
                })
            }
        })
    }

}
