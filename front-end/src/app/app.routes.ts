import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { IcmsHomeComponent } from './pages/icms/icms-home/icms-home.component';
import { TesteComponent } from './pages/teste/teste.component';
import { NotasProcessadasComponent } from './pages/icms/notas-processadas/notas-processadas.component';
import {  NotasCarregarComponent } from './pages/icms/notas-carregar/notas-carregar.component'
import { EmpresaFormComponent } from './pages/icms/empresa-form/empresa-form.component';
import { AliquotaComponent } from './pages/adm/aliquota/aliquota.component';

export const routes: Routes = [

  { path: '',component: InicioComponent},
  { 
    path: 'icms', children: [
      { path: '', component: IcmsHomeComponent }, 
      { path: 'notas-processadas', component: NotasProcessadasComponent },
      { path: 'notas-carregar', component: NotasCarregarComponent },
      { path: 'empresa-form', component: EmpresaFormComponent},
    ]
  },
  { path: 'teste', component: TesteComponent},
  { path: 'adm', children: [
    { path: 'aliquota', component: AliquotaComponent }
  ]}

];
