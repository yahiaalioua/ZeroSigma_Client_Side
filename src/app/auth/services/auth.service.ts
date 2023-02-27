import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, shareReplay, switchMap, tap,BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/core/services/Storage/storage.service';
import { ToastService } from 'src/app/Shared/services/toast.service';
import { StoreService } from 'src/app/state/store.service';
import { AuthErrorHandlerService } from '../Errors/auth-error-handler.service';
import { login } from '../feature/login/interfaces/loginInterface';
import { register } from '../feature/register/Interfaces/register';
import { AuthResponse } from '../Models/AuthModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  RegisterUrl:string='https://localhost:7063/api/user/Register';
  LoginUrl:string='https://localhost:7063/api/user/Authenticate';
  isLoading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false)
  constructor(private http:HttpClient,private storage:StorageService,private router:Router,private store:StoreService,private toast:ToastService,private AuthErrService:AuthErrorHandlerService) { }
  signup({name,email,password}:register):Observable<any>{
    return this.http.post<register>(this.RegisterUrl,{name,email,password}).pipe(shareReplay(),
    map((resp:any)=>{
      console.log(resp)
      this.router.navigateByUrl('/login')
      this.toast.SetToast({Title:'success',Message:resp.message,Type:'Success',Show:true})
      this.toast.DismissToast()
    }),catchError(err=>{
      this.AuthErrService.HandleSignUpErrorMessage(err.error.message)
      return of(err.error.message)
    })
  )}
  login({email,password}:login):Observable<any>{
    return this.http.post<login>(this.LoginUrl,{email,password}).pipe(
      shareReplay(),
      map((resp:any)=>{
        const authResp:AuthResponse=resp
        this.storage.setItem('AuthDetails',authResp)
        this.store.setState({...this.store.currentState, UserStatus:{isLoggedIn:true,isLoggedOut:false},
          UserCredentials:{email:authResp.payload.email,fullName:authResp.payload.name}
        });
        this.router.navigateByUrl('/dashbord');
        return resp
      }),tap(()=>this.isLoading.next(false))
      ,catchError(err=>{
        this.AuthErrService.HandleLoginErrorMessage(err.error.message)
        return of(err.error.message)
      }),tap(()=>this.isLoading.next(false))
    )}
    logout(){
      this.storage.removeItem('AuthDetails');
      this.store.setState(this.store.currentState);
      this.router.navigate(['/login'])
    }

}
