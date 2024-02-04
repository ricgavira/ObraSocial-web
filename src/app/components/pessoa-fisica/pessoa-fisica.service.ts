import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PessoaFisica } from './pessoa-fisica.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PessoaFisicaSimples } from './pessoa-fisica-simples.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaFisicaService {

  constructor(private http: HttpClient) { }

  public gravar(model: PessoaFisica, alterando: boolean): Observable<string> {
    if (alterando) {
      return this.http.put<string>(`${environment.apiUrl}PessoaFisica`, model);  
    }
    return this.http.post<string>(`${environment.apiUrl}PessoaFisica`, model);
  }

  public obterTodos(): Observable<PessoaFisica[]> {
    return this.http.get<PessoaFisica[]>(`${environment.apiUrl}PessoaFisica`);
  }

  public obterTodosSimples(): Observable<PessoaFisicaSimples[]> {
    return this.http.get<PessoaFisicaSimples[]>(`${environment.apiUrl}PessoaFisica/GetAllSimple`);
  }

  public obterPorId(id: string): Observable<PessoaFisica> {
    return this.http.get<PessoaFisica>(`${environment.apiUrl}PessoaFisica/${id}`);
  }
}