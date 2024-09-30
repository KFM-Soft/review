import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IcmsNota } from '../models/IcmsNota';

@Injectable({
  providedIn: 'root'
})
export class IcmsService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.API_URL + '/icms/'

  getValoresCalculo(files: File[]): Observable<IcmsNota[]> {
    let url = this.apiUrl + 'calculo';

    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`xmls`, file);
    });

    return this.http.post<IcmsNota[]>(url, formData);
  }



  generateReport(notas: IcmsNota[]) {
    let url = this.apiUrl + 'relatorio';
    window.open(`${url}`, '_blank');
  }

  getIcmsRelatorios(token: string): Observable<IcmsNota[]> {
    let url = this.apiUrl + 'mostrar/3';

    return this.http.get<IcmsNota[]>(url);
  }

  // referencia: https://consolelog.com.br/utilizando-httpclient-angular-para-obter-pdf-api-visualizacao-download/
  download(notas: IcmsNota[]) {
    let url = this.apiUrl + 'relatorio';
    const body = notas;
    this.http
      .post(url, body, {
        responseType: "arraybuffer",
      })
      .subscribe((response) => {
        // Cria um Blob representando o PDF
        // a partir do response
        const pdfBlob = new Blob([response], {
          type: "application/pdf",
        });

        // Cria uma URL temporária
        // para o Blob usando createObjectURL
        const temporaryUrl =
          window.URL.createObjectURL(pdfBlob);

        // Torna a URL segura para uso
        // no iframe utilizando DomSanitizer
        // this.url =
        //   this.sanitizer.bypassSecurityTrustResourceUrl(
        //     temporaryUrl
        //   );

        const temporaryAnchor = document.createElement("a");
        temporaryAnchor.href = temporaryUrl;

        // temporaryAnchor.download = `arquivo-${Date.now()}.pdf`;

        // Se quiser abrir o conteúdo em uma nova aba,
        // comente a linha acima e descomente a linha
        // abaixo, caso prefira baixar faça ao contrário.
        temporaryAnchor.target = "_blank";

        document.body.appendChild(temporaryAnchor);
        temporaryAnchor.click();
        temporaryAnchor.remove();
      });
  }
}
