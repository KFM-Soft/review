import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { provideNzIcons } from './icons-provider';
import { pt_BR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(pt);

export const appConfig: ApplicationConfig = {
<<<<<<< HEAD
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideNzIcons(), 
    provideNzI18n(en_US), 
    importProvidersFrom(FormsModule), 
    provideAnimationsAsync(), 
    provideHttpClient()
  ]
=======
  providers: [provideRouter(routes), provideClientHydration(), provideNzIcons(), provideNzI18n(pt_BR), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()]
>>>>>>> 2c3d6868e3d54639d175160bd83790f837929790
};
