import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { IcmsHomeComponent } from './pages/icms/icms-home/icms-home.component';
import { TesteComponent } from './pages/teste/teste.component';
import { NotasProcessadasComponent } from './pages/icms/notas-processadas/notas-processadas.component';
import {  NotasCarregarComponent } from './pages/icms/notas-carregar/notas-carregar.component'
import { EmpresaFormComponent } from './pages/icms/empresa-form/empresa-form.component';
import { RegrasDeProcessamentoComponent } from './pages/icms/regras-de-processamento/regras-de-processamento.component';
import { AliquotaComponent } from './pages/adm/aliquota/aliquota.component';
import { ProdutoComponent } from './pages/adm/produtos/produtos.component';
import { AliquotaFormComponent } from './pages/adm/aliquota-form/aliquota-form.component';
import { AdmComponent } from './pages/adm/adm.component';

export const routes: Routes = [

  { path: '',component: InicioComponent},
  { path: 'icms', children: [
    { path: '', component: IcmsHomeComponent }, 
    { path: 'notas-processadas', component: NotasProcessadasComponent },
    { path: 'notas-carregar', component: NotasCarregarComponent },
    { path: 'empresa-form', component: EmpresaFormComponent},
    { path: 'regras-processamento', component: RegrasDeProcessamentoComponent},
  ]},
  { path: 'teste', component: TesteComponent},
  { path: 'adm', children: [
    { path: '', component: AdmComponent },
    { path: 'aliquotas', children: [
      { path: '', component: AliquotaComponent },
      { path: 'form', component: AliquotaFormComponent }
    ]},
    { path: 'produtos', component: ProdutoComponent },
  ]}

];
