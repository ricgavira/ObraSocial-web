import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PessoaFisica } from './pessoa-fisica.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaFisicaService {

  constructor(private http: HttpClient) { }

  public gravar(model: PessoaFisica): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}PessoaFisica`, model);
  }
}
