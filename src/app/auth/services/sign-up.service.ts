import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { ToastService } from 'src/app/Shared/services/toast.service';
import { AuthErrorHandlerService } from '../errors/auth-error-handler.service';
import { register } from '../models/register';
import { HttpAuthServiceService } from '../data-access/http-auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    private router:Router,
    private toast:ToastService,
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
}
