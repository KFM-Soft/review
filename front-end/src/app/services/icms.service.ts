import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class IcmsService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.API_URL + '/icms/'

  getValoresCalculo(files: File[]) {
    let url = this.apiUrl + 'calculo';

    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`xmls`, file);
    });

    return this.http.post(url, formData);
  }
}
