import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { IcmsHomeComponent } from './pages/icms/icms-home/icms-home.component';
import { IcmsGrupoNotasComponent } from './pages/icms/icms-grupo-notas/icms-grupo-notas.component';
import { IcmsNotasProcessadasComponent } from './pages/icms/icms-notas-processadas/icms-notas-processadas.component';
import { IcmsImportarNotasComponent } from './pages/icms/icms-importar-notas/icms-importar-notas.component'
import { IcmsEmpresaFormComponent } from './pages/icms/icms-empresa-form/icms-empresa-form.component';
import { AliquotaComponent } from './pages/adm/aliquota/aliquota.component';
import { ProdutoComponent } from './pages/adm/produtos/produtos.component';
import { AliquotaFormComponent } from './pages/adm/aliquota-form/aliquota-form.component';
import { AdmComponent } from './pages/adm/adm.component';
import { ProdutoFormComponent } from './pages/adm/produtos-form/produtos-form.component';
import { EstadosComponent } from './pages/adm/estados/estados.component';
import { EstadosFormComponent } from './pages/adm/estados-form/estados-form.component';
import { MultiplicadoresComponent } from './pages/adm/multiplicadores/multiplicadores.component';
import { MultiplicadoresFormComponent } from './pages/adm/multiplicadores-form/multiplicadores-form.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { CadastroEmpresaComponent } from './pages/cadastro-empresa/cadastro-empresa.component';
import { UsuariosComponent } from './pages/adm/usuarios/usuarios.component';
import { authGuard } from './services/auth.guard';
import { IcmsDetalhesNotaComponent } from './pages/icms/icms-detalhes-nota/icms-detalhes-nota.component';
import { EmpresaComponent } from './pages/adm/empresa/empresa.component';
import { EmpresaFormComponent } from './pages/adm/empresa-form/empresa-form.component';
import { PrecificacaoFormComponent } from './pages/adm/precificacao-form/precificacao-form.component';
import { PrecificacaoComponent } from './pages/adm/precificacao/precificacao.component';
import { loggedInGuard } from './services/logged-in.guard';

export const routes: Routes = [
  {path: '', canActivate: [authGuard], children: [
    { path: '', component: InicioComponent },
    // { path: 'cadastro-empresa', component: CadastroEmpresaComponent },
    {
      path: 'icms', children: [
        // { path: '', component: IcmsHomeComponent }, 
        {
          path: 'grupo-notas/:id', children: [
            { path: '', component: IcmsGrupoNotasComponent },
            { path: 'importar-nota', children:[
              { path: '', component:IcmsImportarNotasComponent},
              { path: 'detalhes-nota', component: IcmsDetalhesNotaComponent},

            ]},
            

          ]
        },
        
        // { path: 'empresa-form', component: IcmsEmpresaFormComponent },
      ]
    },
    // { path: 'teste', component: TesteComponent },
    { path: 'adm',canActivate: [authGuard], data: { papel: 'ROLE_ADMIN' }, children: [
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
        {
          path: 'usuarios', children: [
            { path: '', component: UsuariosComponent },
            { path: 'form', component: CadastroUsuarioComponent },
          ]
        },
        {
          path: 'empresas', children: [
            { path: '', component: EmpresaComponent },
            { path: 'form', component: EmpresaFormComponent },
          ]
        },
        {
          path: 'precos', children: [
            { path: '', component: PrecificacaoComponent },
            { path: 'form', component: PrecificacaoFormComponent },
          ]
        },

      ]
    }
]},
{ path: 'login', canActivate: [loggedInGuard], component: LoginComponent },
{ path: '**', redirectTo: '' }

];

