import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPessoaFisica } from './interface/IPessoaFisica';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PessoaFisicaSimples } from './pessoa-fisica-simples.model';

@Injectable({
  providedIn: 'root'
})

export class PessoaFisicaService {

  /**
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
    
  fazer a autenticacao para os métodos.


  - Da pra usar o "Interceptor", pra não ter que ficar passando por parametro toda vez esse headers com autenticacao
  - Verificar para usar o "Guard" para interceptar rotas, verificar autenticacao e só prosseguir se for permitido
  - Packagr criar pacote com os compoenntes
  - NGRX - Gerenciador de Estado (Usuario Logado, dados que precisam transitar entre as páginas, é um localStorage melhorado)
  - SSR - Server Side (Renderizar pelo servidor e retorna o html pronto)

  */

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