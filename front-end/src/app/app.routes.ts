import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/inicio' },
  { path: 'inicio', loadChildren: () => import('./pages/inicio/inicio.routes').then(m => m.INICIO_ROUTES) },
  { path: 'teste', loadChildren: () => import('./pages/teste/teste.routes').then(m => m.TESTE_ROUTES) },
];
