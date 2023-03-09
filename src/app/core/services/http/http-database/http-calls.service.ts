import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {
  putEmailUrl:string='https://localhost:7063/api/users/email/'
  putNameUrl:string='https://localhost:7063/api/users/name/'

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http:HttpClient) { }
  putEmail(id:number,email:string){
    return this.http.put(`${this.putEmailUrl}${id}`,JSON.stringify(email),this.httpOptions)
  }
  putName(id:number,name:string){
    return this.http.put(`${this.putNameUrl}${id}`,JSON.stringify(name),this.httpOptions)
  }
}
