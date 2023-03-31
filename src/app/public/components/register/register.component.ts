import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthErrorHandlerService } from 'src/app/auth/errors/auth-error-handler.service';
import { FacadeAuthService } from 'src/app/auth/facade/facade-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {
  registerForm:any
  test={}
  errorNotification$?:Observable<string|null>
  constructor(
    private fb:FormBuilder,
    private facadeAuth:FacadeAuthService,private AuthError:AuthErrorHandlerService) {
   }
   signUp$?:Subscription
  ngOnInit(): void {
    this.registerForm=this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]]
    })
    this.errorNotification$=this.AuthError.SignUpError$
  }
  get email():void{
    return this.registerForm.get('email')
  }
  get password():void{
    return this.registerForm.get('password')
  }
  signUp(data:any){
    this.signUp$=this.facadeAuth.signUp(data).subscribe()
  }

  ngOnDestroy(): void {
    this.signUp$?.unsubscribe()
  }

}
