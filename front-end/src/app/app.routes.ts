import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { IcmsComponent } from './pages/icms/icms.component';
import { TesteComponent } from './pages/teste/teste.component';

export const routes: Routes = [

  
  { path: '',component: InicioComponent},
  { path: "icms", component: IcmsComponent},
  { path: 'teste', component: TesteComponent},
  

];
