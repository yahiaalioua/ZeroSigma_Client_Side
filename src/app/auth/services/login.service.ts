import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, shareReplay, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { StoreService } from 'src/app/core/state/store.service';
import { SpinnerService } from 'src/app/Shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthErrorHandlerService } from '../errors/auth-error-handler.service';
import { AuthResponse } from '../models/auth-response';
import { login } from '../models/login';
import { AuthStateService } from './auth-state.service';
import { HttpAuthServiceService } from '../data-access/http-auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private storage:LocalStorageService,private router:Router,
    private authState:AuthStateService,
    private AuthErrService:AuthErrorHandlerService,
    private httpAuthService:HttpAuthServiceService,
    private spinner:SpinnerService
  ) { }

  loadSpinner:BehaviorSubject<boolean>=this.spinner.isLoadding

  login({email,password}:login):Observable<any>{
    return this.httpAuthService.PostSession({email,password}).pipe(
      shareReplay(),
      map((resp:AuthResponse)=>{
        const AuthResp:AuthResponse=resp
        this.storage.setItem('AuthDetails',AuthResp)
        this.authState.setLocalStorageState(AuthResp);
        this.authState.setAuthState({...this.authState.getCurrentState(), UserStatus:{isLoggedIn:true,isLoggedOut:false}
        });
        this.router.navigateByUrl('/dashbord');
        return resp
      }),tap(()=>this.loadSpinner.next(false))
      ,catchError(err=>{
        const ErrorMessage:string=err.error.message
        this.AuthErrService.HandleLoginErrorMessage(ErrorMessage)
        return of(null)
      }),tap(()=>this.loadSpinner.next(false))
    )}

}

