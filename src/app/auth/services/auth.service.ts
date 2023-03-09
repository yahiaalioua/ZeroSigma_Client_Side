import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, shareReplay, tap,BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { ToastService } from 'src/app/Shared/services/toast.service';
import { StoreService } from 'src/app/core/state/store.service';
import { AuthErrorHandlerService } from '../errors/auth-error-handler.service';
import { AuthResponse } from '../models/auth-model';
import { HttpAuthServiceService } from './Http/http-auth-service.service';
import { register } from 'src/app/public/models/register';
import { login } from 'src/app/public/models/loginInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  RegisterUrl:string='https://localhost:7063/api/users/new';
  LoginUrl:string='https://localhost:7063/api/users/session';
  GetUserDataUrl:string='https://localhost:7063/api/users/'
  isLoading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false)
  constructor(
    private storage:LocalStorageService,private router:Router,
    private store:StoreService,private toast:ToastService,
    private AuthErrService:AuthErrorHandlerService,
    private httpAuthService:HttpAuthServiceService,
    ) { }
  signup({name,email,password}:register):Observable<any>{
    return this.httpAuthService.PostNewUser({name,email,password}).pipe(
    map((resp:any)=>{
      this.router.navigateByUrl('/login')
      this.toast.SetToast({Title:'success',Message:resp.message,Type:'Success',Show:true})
    }),catchError(err=>{
      const ErrorMessage:string=err.error.message
      this.AuthErrService.HandleSignUpErrorMessage(ErrorMessage)
      return of(null)
    })
  )}

  login({email,password}:login):Observable<any>{
    return this.httpAuthService.PostSession({email,password}).pipe(
      shareReplay(),
      map((resp:AuthResponse)=>{
        const AuthResp:AuthResponse=resp
        this.storage.setItem('AuthDetails',AuthResp)
        this.store.setLocalStorageState(AuthResp);
        this.store.setState({...this.store.GetUserState(), UserStatus:{isLoggedIn:true,isLoggedOut:false}
        });
        this.router.navigateByUrl('/dashbord');
        return resp
      }),tap(()=>this.isLoading.next(false))
      ,catchError(err=>{
        const ErrorMessage:string=err.error.message
        this.AuthErrService.HandleLoginErrorMessage(ErrorMessage)
        return of(null)
      }),tap(()=>this.isLoading.next(false))
    )}


    logout(){
      this.storage.removeItem('AuthDetails');
      this.store.setState(this.store.currentState);
      this.router.navigate(['/login'])
    }

}
