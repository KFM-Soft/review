import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { IcmsHomeComponent } from './pages/icms/icms-home/icms-home.component';
import { TesteComponent } from './pages/teste/teste.component';
import { IcmsNotasProcessadasComponent } from './pages/icms/icms-notas-processadas/icms-notas-processadas.component';
import {  IcmsImportarNotasComponent } from './pages/icms/icms-importar-notas/icms-importar-notas.component'
import { IcmsEmpresaFormComponent } from './pages/icms/icms-empresa-form/icms-empresa-form.component';
import { IcmsRegrasDeProcessamentoComponent } from './pages/icms/icms-regras-de-processamento/icms-regras-de-processamento.component';

export const routes: Routes = [

  { path: '',component: InicioComponent},
  { 
    path: 'icms', children: [
      { path: '', component: IcmsHomeComponent }, 
      { path: 'notas-processadas', component: IcmsNotasProcessadasComponent },
      { path: 'importar-nota', component: IcmsImportarNotasComponent },
      { path: 'empresa-form', component: IcmsEmpresaFormComponent},
      { path: 'regras-processamento', component: IcmsRegrasDeProcessamentoComponent},
    ]
  },
  { path: 'teste', component: TesteComponent},

];
