import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { IcmsHomeComponent } from './pages/icms/icms-home/icms-home.component';
import { TesteComponent } from './pages/teste/teste.component';
import { NotasProcessadasComponent } from './pages/notas-processadas/notas-processadas.component';

export const routes: Routes = [

  { path: '',component: InicioComponent},
  { path: "icms", component: IcmsHomeComponent},
  { path: 'teste', component: TesteComponent},
  { path: 'notas-processadas', component: NotasProcessadasComponent},
];
