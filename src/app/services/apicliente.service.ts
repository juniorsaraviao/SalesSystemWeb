import { Cliente } from './../models/cliente';
import { Response } from './../models/response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const requestHeaders = new HttpHeaders()
.append('Content-Type', 'application/json');

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiclienteService {

  private url = 'https://localhost:44302/api/cliente';
  constructor(
    private httpClient: HttpClient
  ) { }

  getClient(): Observable<Response>{
    return this.httpClient.get<Response>(this.url);
  }

  addCliente(cliente: Cliente): Observable<Response>{
    return this.httpClient.post<Response>(this.url, cliente, {headers: requestHeaders});
    // return this.httpClient.post<Response>(this.url, cliente, httpOption);
  }

  editClient(cliente: Cliente): Observable<Response>{
    return this.httpClient.put<Response>(this.url, cliente, {headers: requestHeaders});
  }

  deleteClient(id?: number): Observable<Response>{
    if (id){
      return this.httpClient.delete<Response>(`${this.url}/${id}`);
    }else{
      return new Observable<Response>();
    }
  }
}
