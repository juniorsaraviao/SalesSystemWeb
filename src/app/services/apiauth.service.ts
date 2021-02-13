import { Login } from './../models/login';
import { Usuario } from './../models/usuario';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../models/response';
import { map } from 'rxjs/operators';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiauthService {

  private url = 'https://localhost:44302/api/user/login';
  private usuarioSubject!: BehaviorSubject<Usuario>;
  public user!: Observable<Usuario>;

  public get usuarioData(): Usuario {
    return this.usuarioSubject.value;
  }

  constructor( private httpClient: HttpClient )
  {
    this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('user') ?? 'null'));
    this.user =  this.usuarioSubject.asObservable();
  }

  login( login: Login ): Observable<Response> {
    return this.httpClient.post<Response>(this.url, login, httpOption)
      .pipe(map(res => {
        if (res.success === 1) {
          const user = res.data as Usuario;
          localStorage.setItem('user', JSON.stringify(user));
          this.usuarioSubject.next(user);
        }
        return res;
      }));
  }

  logout(): void{
    localStorage.removeItem('user');
    this.usuarioSubject.next(JSON.parse('null') as Usuario);
  }
}
