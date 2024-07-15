import { Component } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-icms-empresa-form',
  standalone: true,
  imports: [NzFormModule, NzCardModule, NzButtonModule],
  templateUrl: './icms-empresa-form.component.html',
  styleUrl: './icms-empresa-form.component.scss'
})
export class IcmsEmpresaFormComponent {

}
