import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../models/Usuario';
import { ILoginService, LoginService } from '../../services/login/i-login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    @Inject(LoginService) private servico: ILoginService
  ) {}

  usuario: Usuario = <Usuario>{};

  submit(form: NgForm): void {
    this.servico.login(this.usuario);
    form.resetForm();
  }

}