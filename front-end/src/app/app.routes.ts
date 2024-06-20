import { Routes } from '@angular/router';

export const routes: Routes = [

  
  { path: '', pathMatch: 'full', redirectTo: '/inicio' },
  { path: 'inicio', loadChildren: () => import('./pages/inicio/inicio.routes').then(m => m.INICIO_ROUTES) },
  { path: "icms", loadChildren: () => import("./pages/icms/icms.routes").then(m => m.ICMS_ROUTES) },
  { path: 'teste', loadChildren: () => import('./pages/teste/teste.routes').then(m => m.TESTE_ROUTES) },

];
