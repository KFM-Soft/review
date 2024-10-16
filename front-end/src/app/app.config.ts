import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { provideNzIcons } from './icons-provider';
import { pt_BR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientXsrfModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BasicLoginService } from './services/login/basic-login.service';
import { JwtLoginService } from './services/login/jwt-login.service';
import { LoginService } from './services/login/i-login.service';
import { authInterceptor } from './interceptor/auth.interceptor';
import { erroInterceptor } from './interceptor/erro.interceptor';

registerLocaleData(pt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,  withInMemoryScrolling({anchorScrolling: 'enabled'})), 
    provideNzIcons(), 
    provideNzI18n(pt_BR), 
    importProvidersFrom(FormsModule,HttpClientXsrfModule), 
    provideAnimationsAsync(), 
    provideHttpClient(),

    provideHttpClient(withInterceptors([ authInterceptor, erroInterceptor ])),

    { provide: LoginService, useFactory: loginServiceFactory }
  ]
};

export function loginServiceFactory() {

  const authType = environment.AUTH_TYPE;

  if (authType == 'basic') {
    return new BasicLoginService();
  } else if (authType == 'jwt') {
    return new JwtLoginService();
  } else {
    throw new Error('Tipo de autenticação deve ser "basic" ou "jwt".');
  }

}
