import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { login } from '../../feature/login/interfaces/loginInterface';
import { register } from '../../feature/register/Interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthServiceService {
  NewUserUrl:string='https://localhost:7063/api/users/new';
  AuthSessionUrl:string='https://localhost:7063/api/users/session';
  GetUserDataUrl:string='https://localhost:7063/api/users/'
  constructor(private http:HttpClient) { }
  PostNewUser({name,email,password}:register):Observable<any>{
    return this.http.post<register>(this.NewUserUrl,{name,email,password})
  }
  PostSession({email,password}:login):Observable<any>{
    return this.http.post<login>(this.AuthSessionUrl,{email,password})
  }
  GetUserById(Id:number):Observable<any>{
    return this.http.get(`${this.GetUserDataUrl}${Id}`)
  }
}
