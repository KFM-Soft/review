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


@Component({
  selector: 'app-cadastro-precificacao',
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
  templateUrl: './cadastro-precificacao.component.html',
  styleUrl: './cadastro-precificacao.component.scss'
})
export class CadastroPrecificacaoComponent {
  precificacao: Precificacao = <Precificacao>{};
  id: string | null = null;
  editavel: boolean = true;

  constructor(
    private service: PrecificacaoService,
    private storageService: StoragesService,
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
      next: () => {
        alert("Registro salvo com sucesso!")
        this.router.navigate(['../'], {relativeTo: this.route})
      }
    })
  }
}
