import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,} from '@angular/forms';
import { BehaviorSubject, Observable} from 'rxjs';
import { AuthErrorHandlerService } from 'src/app/auth/Errors/auth-error-handler.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { login } from '../../interfaces/loginInterface';


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
  constructor(private fb:FormBuilder,private Authservice:AuthService,private AuthError:AuthErrorHandlerService) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]]
    })
    this.errorNotification$=this.AuthError.LoginError$;
    this.isLoading$=this.Authservice.isLoading
  }


  get email():void{
    return this.loginForm.get('email')
  }
  get password():void{
    return this.loginForm.get('password')
  }


  Login(data:any){
    this.Authservice.login(data).subscribe()
    this.isLoading$?.next(true)
  }
}
