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
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-notas-carregar',
  standalone: true,
  imports: [
    NzCardModule, 
    NzTableModule, 
    NzFlexModule,
    NzButtonModule, 
    NzPaginationModule, 
    NzIconModule, 
    NzBreadCrumbModule, 
    NzLayoutModule, 
    NzMenuModule, 
    CommonModule,
    NzUploadModule,
    RouterLink,

  ],
  templateUrl: './notas-carregar.component.html',
  styleUrl: './notas-carregar.component.scss'
})
export class NotasCarregarComponent {


  constructor(private msg: NzMessageService) {}

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }
}

