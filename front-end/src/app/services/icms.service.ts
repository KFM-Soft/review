import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
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
}
