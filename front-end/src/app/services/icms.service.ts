import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Observable } from 'rxjs';
import { IcmsNota } from '../models/IcmsNota';
import { DomSanitizer} from '@angular/platform-browser';
import { Relatorio } from '../models/Relatorio';

@Injectable({
  providedIn: 'root'
})
export class IcmsService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.API_URL + '/icms/'

  getValoresCalculo(files: File[], token:string, reviewValue: string, empresaId: number): Observable<IcmsNota[]> {
    let url = this.apiUrl + 'calculo/';

    const httpOptions = { 
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`xmls`, file);
    });

    if(reviewValue=== 'true'){
      return this.http.post<IcmsNota[]>(url, formData, httpOptions);

    }
    else{
      url += '?empresa_id=' + empresaId;
      return this.http.post<IcmsNota[]>(url, formData, httpOptions);

    }

  }



  generateReport(notas: IcmsNota[]) {
    let url = this.apiUrl + 'relatorio';
    window.open(`${url}`, '_blank');
  }

  getIcmsRelatorios(token: string): Observable<IcmsNota[]> {
    let url = this.apiUrl + 'mostrar/3';

    return this.http.get<IcmsNota[]>(url);
  }

  salvarPDF(notas: IcmsNota[], empresa_id: number) {
    let url = this.apiUrl + 'salva/';


    
    const valor_total = notas.reduce((acumulador, nota) => {
      const totalPorNota = nota.produtos.reduce((acumuladorProduto, produto) => acumuladorProduto + produto.valorProduto, 0);
      return acumulador + totalPorNota;
    }, 0);

    const valor_icms = notas.reduce((acumulador, nota) => {
      const totalPorNota = nota.produtos.reduce((acumuladorProduto, produto) => acumuladorProduto + produto.resultadoIcmsST, 0);
      return acumulador + totalPorNota;
    }, 0);


    url += empresa_id + '/' + valor_total + '/' + valor_icms;
    this.http.post<Relatorio>(url, notas).subscribe();
  }

  // referencia: https://consolelog.com.br/utilizando-httpclient-angular-para-obter-pdf-api-visualizacao-download/
  download(notas: IcmsNota[]) {

    const url = this.apiUrl + 'relatorio';
    const httpOptions = { 
      responseType: 'arraybuffer' as 'json' // Tipagem correta
    };
    
    const body = notas;

    
    this.http
      .post<ArrayBuffer>(url, body, httpOptions) // Tipar o retorno como ArrayBuffer
      .subscribe((response: ArrayBuffer) => {
        // Cria um Blob representando o PDF
        // a partir do response
        const pdfBlob = new Blob([response], { type: 'application/pdf' });
    
        // Cria uma URL temporária
        // para o Blob usando createObjectURL
        const temporaryUrl = window.URL.createObjectURL(pdfBlob);
    
        // Torna a URL segura para uso
        // no iframe utilizando DomSanitizer
        // this.url =
        //   this.sanitizer.bypassSecurityTrustResourceUrl(
        //     temporaryUrl
        //   );

        const temporaryAnchor = document.createElement('a');
        temporaryAnchor.href = temporaryUrl;

        // temporaryAnchor.download = arquivo-${Date.now()}.pdf;

        // Se quiser abrir o conteúdo em uma nova aba,
        // comente a linha acima e descomente a linha
        // abaixo, caso prefira baixar faça ao contrário.
        temporaryAnchor.target = '_blank'; // Abrir em uma nova aba
        
        document.body.appendChild(temporaryAnchor);
        temporaryAnchor.click();
        temporaryAnchor.remove();
      });
    
  }
  getDownloadPDF(relatorio_id: number) {
    let url = this.apiUrl + 'mostrar/' + relatorio_id;
  
    const httpOptions = { 
      responseType: 'arraybuffer' as 'json' // Mantém a tipagem correta
    };
  
    this.http
      .get<ArrayBuffer>(url, httpOptions) // Aqui, usamos GET ao invés de POST
      .subscribe((response) => {
        // Cria um Blob representando o PDF
        const pdfBlob = new Blob([response], {
          type: "application/pdf",
        });
  
        // Cria uma URL temporária para o Blob usando createObjectURL
        const temporaryUrl = window.URL.createObjectURL(pdfBlob);
  
        // Cria um link temporário e aciona o download
        const temporaryAnchor = document.createElement('a');
        temporaryAnchor.href = temporaryUrl;

        temporaryAnchor.target = '_blank'; // Abrir em uma nova aba
  
        // Anexa o link ao DOM, aciona o clique e depois remove o link
        document.body.appendChild(temporaryAnchor);
        temporaryAnchor.click();
        document.body.removeChild(temporaryAnchor);
      });
  }
  
}