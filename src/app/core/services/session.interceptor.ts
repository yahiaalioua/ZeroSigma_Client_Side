import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { AuthDetails } from '../models/auth-details';
import { SessionService } from './session.service';
import { FacadeAuthService } from 'src/app/auth/facade/facade-auth.service';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(
    private readonly storage:LocalStorageService,
    private readonly sessionService:SessionService,
    private readonly authFacade:FacadeAuthService
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authDetails:string|null= this.storage.getItem('AuthDetails')
    if(authDetails!=null){
      const AuthDetails=JSON.parse(authDetails)
      const Token=AuthDetails.accessToken
      if(Token){
        request=request.clone({
          setHeaders:{Authorization:`Bearer ${Token}`}
        })
      }
    }
    return next.handle(request).pipe(catchError((err:any)=>{
      if(err instanceof HttpErrorResponse){
        if (err.status==401){
          return this.handleSessionError(request,next)
        }
      }
      return throwError(()=>err)
    }))

  }

  handleSessionError(request:HttpRequest<any>,next:HttpHandler){
      return this.sessionService.newRefreshTokenSession().pipe(switchMap((data:AuthDetails)=>{
        this.sessionService.storeNewSession(data.refreshToken,data.accessToken)
        request=request.clone({
          setHeaders:{Authorization:`Bearer ${data.accessToken}`}
        })
        return next.handle(request).pipe(catchError(err=>{
          this.authFacade.logout();
          return throwError(()=>err)
        }))
      }))
  }
}
