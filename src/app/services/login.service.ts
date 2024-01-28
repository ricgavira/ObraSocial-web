import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from './interfaces/ILogin';
import { ILoginResponse } from './interfaces/ILoginResponse';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(payload: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${environment.apiUrl}Usuario/login`, payload);
  }
}