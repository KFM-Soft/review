import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
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
import { IcmsNota } from '../../../models/IcmsNota';
import { StoragesService } from '../../../services/storages.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Empresa } from '../../../models/Empresa';
import { EmpresasService } from '../../../services/empresas.service';
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
export class IcmsImportarNotasComponent implements OnInit{

  private token: string | null = null;

  constructor(
    private msg: NzMessageService,
    private service: IcmsService,
    private empresaService: EmpresasService,
    private storageService: StoragesService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    
  }

  empresaId: number | null = null;
  empresa: Empresa = <Empresa>{}

  xmlFile: NzUploadFile = <NzUploadFile>{};
  notasCalculadas: IcmsNota[] = [];
  fileList: NzUploadFile[] = [];
  reviewValue = "true";

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.empresaId = +id;
      }
      this.token = this.storageService.getSession('token');
      this.getEmpresa()
    });
  }

  getEmpresa(): void {
    if(this.empresaId && this.token){
      this.empresaService.getId( this.token, this.empresaId).subscribe({
        next: (response: Empresa) => {
          this.empresa = response;
        },
      });

    }
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    
    const status = file.status;
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
    if(this.token && this.empresaId){
      this.service.getValoresCalculo(files, this.token, this.reviewValue, this.empresaId).subscribe({
        next: (response: IcmsNota[]) => {
          this.notasCalculadas = response;
          this.storageService.setSession('notasCalculadas', this.notasCalculadas);
          this.router.navigate(['./detalhes-nota'], {relativeTo: this.route}, )
        },
        error: (error: any) => {
          console.error('Erro no upload', error)
        }
      });
    }

  }

}
