import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { IcmsGrupoNotasComponent } from './pages/icms/icms-grupo-notas/icms-grupo-notas.component';
import { IcmsImportarNotasComponent } from './pages/icms/icms-importar-notas/icms-importar-notas.component'
import { AliquotaComponent } from './pages/adm/aliquota/aliquota.component';
import { AliquotaFormComponent } from './pages/adm/aliquota-form/aliquota-form.component';
import { AdmComponent } from './pages/adm/adm.component';
import { EstadosComponent } from './pages/adm/estados/estados.component';
import { EstadosFormComponent } from './pages/adm/estados-form/estados-form.component';
import { MultiplicadoresComponent } from './pages/adm/multiplicadores/multiplicadores.component';
import { MultiplicadoresFormComponent } from './pages/adm/multiplicadores-form/multiplicadores-form.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/adm/usuarios/usuarios.component';
import { authGuard } from './services/auth.guard';
import { IcmsDetalhesNotaComponent } from './pages/icms/icms-detalhes-nota/icms-detalhes-nota.component';
import { EmpresaComponent } from './pages/adm/empresa/empresa.component';
import { EmpresaFormComponent } from './pages/adm/empresa-form/empresa-form.component';
import { PrecificacaoFormComponent } from './pages/adm/precificacao-form/precificacao-form.component';
import { PrecificacaoComponent } from './pages/adm/precificacao/precificacao.component';
import { loggedInGuard } from './services/logged-in.guard';
import { UsuariosFormComponent } from './pages/adm/usuarios-form/usuarios-form.component';
import { NcmComponent } from './pages/adm/ncm/ncm.component';
import { NcmFormComponent } from './pages/adm/ncm-form/ncm-form.component';

export const routes: Routes = [
    {
        path: '', canActivate: [authGuard], children: [
            { path: '', component: InicioComponent },
            {
                path: 'icms', children: [
                    {
                        path: 'grupo-notas/:id', children: [
                            { path: '', component: IcmsGrupoNotasComponent },
                            {
                                path: 'importar-nota', children: [
                                    { path: '', component: IcmsImportarNotasComponent },
                                    { path: 'detalhes-nota', component: IcmsDetalhesNotaComponent },

                                ]
                            },


                        ]
                    },
                ]
            },
            {
                path: 'adm', canActivate: [authGuard], data: { papel: 'ROLE_ADMIN' }, children: [
                    { path: '', component: AdmComponent },
                    {
                        path: 'aliquotas', children: [
                            { path: '', component: AliquotaComponent },
                            { path: 'form', component: AliquotaFormComponent },
                        ]
                    },
                    {
                        path: 'ncms', children: [
                            { path: '', component: NcmComponent },
                            { path: 'form', component: NcmFormComponent },
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
                            { path: 'form', component: UsuariosFormComponent },
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
        ]
    },
    { path: 'login', canActivate: [loggedInGuard], component: LoginComponent },
    { path: '**', redirectTo: '' }

];

