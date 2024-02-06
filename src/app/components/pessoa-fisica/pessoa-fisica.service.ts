import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPessoaFisica } from './interface/IPessoaFisica';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PessoaFisicaSimples } from './pessoa-fisica-simples.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaFisicaService {

  constructor(private http: HttpClient) { }

  public gravar(model: IPessoaFisica, alterando: boolean): Observable<IPessoaFisica> {
    if (alterando) {
      return this.http.put<IPessoaFisica>(`${environment.apiUrl}PessoaFisica`, model);  
    }
    return this.http.post<IPessoaFisica>(`${environment.apiUrl}PessoaFisica`, model);
  }

  public obterTodos(): Observable<IPessoaFisica[]> {
    return this.http.get<IPessoaFisica[]>(`${environment.apiUrl}PessoaFisica`);
  }

  public obterTodosSimples(): Observable<PessoaFisicaSimples[]> {
    return this.http.get<PessoaFisicaSimples[]>(`${environment.apiUrl}PessoaFisica/GetAllSimple`);
  }

  public obterPorId(id: string): Observable<IPessoaFisica> {
    return this.http.get<IPessoaFisica>(`${environment.apiUrl}PessoaFisica/${id}`);
  }
}