import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AdmComponent } from '../adm.component';
import { UsuarioService } from '../../../services/usuario.service';
import { StoragesService } from '../../../services/storages.service';
import { Usuario } from '../../../models/Usuario';
import { ETipoAlerta } from '../../../models/e-tipo-alerta';
import { AlertaService } from '../../../services/alerta.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    NzMenuModule,
    NzLayoutModule,
    NzIconModule,
    NzFlexModule,
    NzTableModule,
    NzButtonModule,
    NzPaginationModule,
    NzInputModule,
    NzGridModule,
    FormsModule,
    RouterLink,
    AdmComponent,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit{

  constructor(
    private renderer: Renderer2,
    private service: UsuarioService,
    private alertaService: AlertaService,
    private storageService: StoragesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.getUsuarios();
  }

  registros: Usuario[] = [];
  usuarios: Usuario[] = [];
  total: number = 0;
  paginaTamanho = 5;
  paginaIndex = 1;
  termoBusca: string = '';

  getUsuarios() {
    this.get()
  }

  get(): void{
    this.service.get().subscribe({
      next: (retorno: Usuario[]) => {
        this.registros = retorno
        this.total = retorno.length;
      },
      error: (error) => {
        console.error("Erro ao buscar usuários: ", error);
      }
    })
  }

  atualizarTabela(): void {
    let filtro = this.usuarios;

    if (this.termoBusca) {

      filtro = filtro.filter(usuario =>
        usuario.nomeCompleto.toLowerCase().includes(this.termoBusca.toLowerCase())
          ||
          usuario.nomeUsuario?.toLowerCase().includes(this.termoBusca.toLowerCase())
      );
    }

    this.total = filtro.length;
    const startIndex = (this.paginaIndex - 1) * this.paginaTamanho;
    const endIndex = startIndex + this.paginaTamanho;
    this.registros = filtro.slice(startIndex, endIndex);
  }

  atualizarPagina(paginaindex: number): void {
    this.paginaIndex = paginaindex;
    this.atualizarTabela();
  }

  tamanhoPagina(paginaTamanho: number): void {
    this.paginaTamanho = paginaTamanho;
    this.atualizarTabela();
  }

  editarItem(registro: Usuario){
    this.storageService.setSession('Usuario', registro);
    this.router.navigate(['./form'], {relativeTo: this.route, queryParams: {id: registro.id}});
  }

  excluirItem(registro: Usuario){
    this.service.delete(registro.id).subscribe({
      complete: () => {
        this.get();
        this.alertaService.enviarAlerta({
            tipo: ETipoAlerta.SUCESSO,
            mensagem: "Usuário foi excluído com sucesso!"
        })
      }
    });
  }

}
