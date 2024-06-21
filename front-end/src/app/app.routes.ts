import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { IcmsHomeComponent } from './pages/icms/icms-home/icms-home.component';
import { TesteComponent } from './pages/teste/teste.component';

export const routes: Routes = [

  { path: '',component: InicioComponent},
  { path: "icms", component: IcmsHomeComponent},
  { path: 'teste', component: TesteComponent},

];
