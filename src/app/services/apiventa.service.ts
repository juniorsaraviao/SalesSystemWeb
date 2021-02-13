import { Observable } from 'rxjs';
import { Venta } from './../models/venta';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiventaService {

  private readonly url: string = 'https://localhost:44302/api/venta';

  constructor(
    private httpClient: HttpClient
  ) { }

  addVenta(venta: Venta): Observable<Response>{
    console.log(venta);
    return this.httpClient.post<Response>(this.url,
      venta, httpOption);
  }
}
