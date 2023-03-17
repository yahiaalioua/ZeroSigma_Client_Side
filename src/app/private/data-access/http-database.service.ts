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
  getAccountInfoUrl:string='https://localhost:7063/api/users/account/info/'
  delateAccountUrl:string='https://localhost:7063/api/users/'
  getIntrinsicValueUrl:string='https://localhost:7063/api/intrinsic-value?ticker='
  // verify password
  getPasswordUrl:string='https://localhost:7063/api/users/password'

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  getAccountInfo(Id:number):Observable<any>{
    return this.http.get(`${this.getAccountInfoUrl}${Id}`)
  }
  putEmail(id:number,email:string){
    return this.http.put(`${this.putEmailUrl}${id}`,JSON.stringify(email),this.httpOptions)
  }
  putName(id:number,name:string){
    return this.http.put(`${this.putNameUrl}${id}`,JSON.stringify(name),this.httpOptions)
  }
  delateAccount(id:number){
    return this.http.delete(`${this.delateAccountUrl}${id}`)
  }
  getIntrinsicValue(ticker:string){
    return this.http.get(`${this.getIntrinsicValueUrl}${ticker}`)
  }
  verifyPassword(id:number,password:string){
    return this.http.get(`${this.getPasswordUrl}?id=${id}&password=${password}`)
  }
}
