import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions:any = {
    headers: new HttpHeaders({
    'Accept':  'application/json',
    'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getProducts(data:any){
    return this.http.post(environment.api + "/query", data, this.httpOptions);
  }
}
