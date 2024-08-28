import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  submited: boolean = false;
  isLoading: boolean = false;

  public error: any = {
    incorrectInfo: false,
    message: ''
  };

  constructor(
    private userService: UsuarioService,
    private router: Router
    ) {}

  ngOnInit() {
    document.body.className = "background-login";

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy(){
    document.body.className="";
  }

  login() {
    this.submited = true;
    this.isLoading = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.login) {
          window.localStorage.setItem('token', response.token);
          window.localStorage.setItem('userType', response.type);

          this.isLoading = false;
          this.router.navigate(['/inicio']);
        } else {
          this.error.incorrectInfo = true;
          this.error.message = response.message;
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.error.incorrectInfo = true;
        this.error.message = 'Erro ao fazer login';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
