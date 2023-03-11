import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpDatabaseService {

  constructor(private http:HttpClient) { }
  putEmailUrl:string='https://localhost:7063/api/users/email/'
  putNameUrl:string='https://localhost:7063/api/users/name/'
  GetUserDataUrl:string='https://localhost:7063/api/users/'

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  GetUserById(Id:number):Observable<any>{
    return this.http.get(`${this.GetUserDataUrl}${Id}`)
  }
  putEmail(id:number,email:string){
    return this.http.put(`${this.putEmailUrl}${id}`,JSON.stringify(email),this.httpOptions)
  }
  putName(id:number,name:string){
    return this.http.put(`${this.putNameUrl}${id}`,JSON.stringify(name),this.httpOptions)
  }
}
