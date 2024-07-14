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
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IcmsService } from '../../../services/icms.service';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-icms-notas-carregar',
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
    NzRadioModule,
    FormsModule,

  ],
  templateUrl: './icms-importar-notas.component.html',
  styleUrl: './icms-importar-notas.component.scss'
})
export class IcmsImportarNotasComponent {


  constructor(
    private msg: NzMessageService,
    private service: IcmsService,
  ) {}

  xmlFile: NzUploadFile = <NzUploadFile>{};
  fileList: NzUploadFile[] = [];
  reviewValue = 'Y';

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

  beforeUploadSupply = (file: NzUploadFile): boolean => {
    this.xmlFile = file;
    // if(this.fileList.length > 0) this.fileList = [];
    this.fileList = this.fileList.concat(file);
    return false;
  };

  convertNzUploadFileToFile(nzUploadFiles: NzUploadFile[]): File[] {
    return nzUploadFiles.map(nzFile => nzFile as unknown as File).filter(file => !!file);
  }

  enviar() {
    const files: File[] = this.convertNzUploadFileToFile(this.fileList);

    this.service.passXmlsFiles(files).subscribe({
      next: (response: any) => console.log(response.texto), 
      error: (error: any) => {
        console.error('Erro no upload', error)
      }
    });

  }

}

