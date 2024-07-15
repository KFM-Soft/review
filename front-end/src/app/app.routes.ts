import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { TesteComponent } from './pages/teste/teste.component';
import { IcmsHomeComponent } from './pages/icms/icms-home/icms-home.component';
import { IcmsGrupoNotasComponent } from './pages/icms/icms-grupo-notas/icms-grupo-notas.component';
import { IcmsNotasProcessadasComponent } from './pages/icms/icms-notas-processadas/icms-notas-processadas.component';
import { IcmsImportarNotasComponent } from './pages/icms/icms-importar-notas/icms-importar-notas.component'
import { IcmsEmpresaFormComponent } from './pages/icms/icms-empresa-form/icms-empresa-form.component';
import { IcmsRegrasDeProcessamentoComponent } from './pages/icms/icms-regras-de-processamento/icms-regras-de-processamento.component';
import { AliquotaComponent } from './pages/adm/aliquota/aliquota.component';
import { ProdutoComponent } from './pages/adm/produtos/produtos.component';
import { AliquotaFormComponent } from './pages/adm/aliquota-form/aliquota-form.component';
import { IcmsDetalhesNotas } from './pages/icms/icms-detalhes-nota/icms-detalhes-nota.component';

export const routes: Routes = [

  { path: '',component: InicioComponent},
  { 
    path: 'icms', children: [
      { path: '', component: IcmsHomeComponent }, 
      { path: 'grupo-notas', children: [
        { path: '', component: IcmsGrupoNotasComponent},
        { path: 'notas-processadas', component: IcmsNotasProcessadasComponent },
      ]},
      { path: 'importar-nota', component: IcmsImportarNotasComponent },
      { path: 'empresa-form', component: IcmsEmpresaFormComponent},
      { path: 'regras-processamento', component: IcmsRegrasDeProcessamentoComponent},
      { path: 'detalhes-nota', component: IcmsDetalhesNotas },
    ]
  },
  { path: 'teste', component: TesteComponent},
  { path: 'adm', children: [
    { path: 'aliquotas', children: [
      { path: '', component: AliquotaComponent },
      { path: 'form', component: AliquotaFormComponent }
    ]},
    { path: 'produtos', component: ProdutoComponent },
  ]}

];
