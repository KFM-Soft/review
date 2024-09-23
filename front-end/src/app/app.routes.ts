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
import { AdmComponent } from './pages/adm/adm.component';
import { ProdutoFormComponent } from './pages/adm/produtos-form/produtos-form.component';
import { IcmsDetalhesNotas } from './pages/icms/icms-detalhes-nota/icms-detalhes-nota.component';
import { EstadosComponent } from './pages/adm/estados/estados.component';
import { EstadosFormComponent } from './pages/adm/estados-form/estados-form.component';
import { MultiplicadoresComponent } from './pages/adm/multiplicadores/multiplicadores.component';
import { MultiplicadoresFormComponent } from './pages/adm/multiplicadores-form/multiplicadores-form.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroUsuarioComponent},
  { path: '', component: InicioComponent },
  {
    path: 'icms', children: [
      { path: '', component: IcmsHomeComponent },
      { path: 'grupo-notas', children: [
        { path: '', component: IcmsGrupoNotasComponent },
        { path: 'notas-processadas', component: IcmsNotasProcessadasComponent },
      ]},
      { path: 'importar-nota', component: IcmsImportarNotasComponent },
      { path: 'empresa-form', component: IcmsEmpresaFormComponent },
      { path: 'regras-processamento', component: IcmsRegrasDeProcessamentoComponent },
      { path: 'detalhes-nota', component: IcmsDetalhesNotas },
    ]
  },
  { path: 'teste', component: TesteComponent },
  {
    path: 'adm', children: [
      { path: '', component: AdmComponent },
      {
        path: 'aliquotas', children: [
          { path: '', component: AliquotaComponent },
          { path: 'form', component: AliquotaFormComponent },
        ]
      },
      {
        path: 'produtos', children: [
          { path: '', component: ProdutoComponent },
          { path: 'form', component: ProdutoFormComponent },
        ]
      },
      {
        path: 'estados', children: [
          { path: '', component: EstadosComponent },
          { path: 'form', component: EstadosFormComponent },
        ]
      },
      {
        path: 'multiplicadores', children: [
          { path: '', component: MultiplicadoresComponent },
          { path: 'form', component: MultiplicadoresFormComponent },
        ]
      },
    ]
  }
];

