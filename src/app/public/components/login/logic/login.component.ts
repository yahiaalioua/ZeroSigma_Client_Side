import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,} from '@angular/forms';
import { BehaviorSubject, Observable} from 'rxjs';
import { AuthErrorHandlerService } from 'src/app/auth/errors/auth-error-handler.service';
import { FacadeAuthService } from 'src/app/auth/facade/facade-auth.service';
import { login } from '../../../../auth/models/login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:any
  loginData!:login
  registerData:any
  errorNotification$?:Observable<string|null>;
  isLoading$?:BehaviorSubject<boolean>;
  constructor(private fb:FormBuilder,
    private facadeAuth:FacadeAuthService,
    private AuthError:AuthErrorHandlerService) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]]
    })
    this.errorNotification$=this.AuthError.LoginError$;
    this.isLoading$=this.facadeAuth.loadSpinner
  }


  get email():void{
    return this.loginForm.get('email')
  }
  get password():void{
    return this.loginForm.get('password')
  }


  Login(data:any){
    this.facadeAuth.login(data).subscribe()
    this.isLoading$?.next(true)
  }
}
