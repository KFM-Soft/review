import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login/i-login.service';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

    // Se o usuário está logado, redireciona para a rota principal (ou outra rota)
    if (loginService.isLoggedIn()) {
      router.navigate(['/']); // Redirecione para a rota desejada
      return false;
    }
  
    // Se o usuário não está logado, permite o acesso à rota de login
    return true;
};
