import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { IcmsHomeComponent } from './pages/icms/icms-home/icms-home.component';
import { TesteComponent } from './pages/teste/teste.component';
import { NotasProcessadasComponent } from './pages/icms/notas-processadas/notas-processadas.component';
import {  NotasCarregarComponent } from './pages/icms/notas-carregar/notas-carregar.component'

export const routes: Routes = [

  { path: '',component: InicioComponent},
  { path: 'icms', component: IcmsHomeComponent},
  { path: 'notas-processadas', component: NotasProcessadasComponent},
  { path: 'notas-carregar', component: NotasCarregarComponent},
  { path: 'teste', component: TesteComponent},

];
