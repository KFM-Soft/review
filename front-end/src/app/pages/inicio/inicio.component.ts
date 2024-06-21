import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';

interface Empresas {
  nome: string;
  data_expirar: string;
  button: boolean
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, NzBreadCrumbModule, NzCardModule, NzFlexModule, NzTableModule, NzFlexModule, NzButtonModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  empresas: Empresas[] = [
    { nome: 'Indústria LTDA', data_expirar: '05/11/2024', button: true},
    { nome: 'Indústria LTDA', data_expirar: '05/11/2024', button: true},
    { nome: 'Indústria LTDA', data_expirar: '05/11/2024', button: true},
    { nome: 'Indústria LTDA', data_expirar: '05/11/2024', button: true},
    { nome: 'Licença de EPP Disponível', data_expirar: '05/11/2024', button: false},
  ]
}
