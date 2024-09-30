import { Usuario } from './../../models/Usuario';
import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { StoragesService } from '../../services/storages.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss'
})
export class CadastroUsuarioComponent {

  usuario: Usuario = <Usuario>{};
  id: string | null = null;
  editavel: boolean = true;

  constructor(
    private service: UsuarioService,
    private storageService: StoragesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id){
      this.usuario = this.storageService.getSession('Usuario');
      this.editavel = false;
    }

  }
  submit(): void {
    this.service.save(this.usuario).subscribe({
      next: () => {
        alert("Registro salvo com sucesso!")
        this.router.navigate(['../'], {relativeTo: this.route})
      }
    })
  }

}
