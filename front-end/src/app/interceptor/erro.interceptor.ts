import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ETipoAlerta } from '../models/e-tipo-alerta';
import { AlertaService } from '../services/alerta.service';
import { LoginService } from '../services/login/i-login.service';

const ERRO_HTTP: Record<number, string> = {
  401: "Não autorizado.",
  403: "Acesso proibido.",
  404: "Recurso não encontrado.",
  500: "Erro interno do servidor."
}

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
  const servicoAlerta = inject(AlertaService);
  const servicoLogin = inject(LoginService);
  return next(req).pipe(
    catchError(erro => {
      let mensagemErro = ERRO_HTTP[erro.status] || erro.error?.message || "Falha na requisição.";
      if (erro.status == 401) {
        servicoLogin.logout();
      }
      servicoAlerta.enviarAlerta({
        tipo: ETipoAlerta.ERRO,
        mensagem: mensagemErro
      });
      return throwError(() => erro);
    })
  );
};