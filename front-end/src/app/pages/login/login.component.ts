import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../models/Usuario';
import { ILoginService, LoginService } from '../../services/login/i-login.service';
import { JwtLoginService } from '../../services/login/jwt-login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    constructor(
        @Inject(JwtLoginService) private servico: ILoginService,
        private route: Router
    ) { }

    usuario: Usuario = <Usuario>{};

    submit(form: NgForm): void {
        this.servico.login(this.usuario);
        this.route.navigate(['/inicio']);
        form.resetForm();
    }

}
