import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthStateService } from 'src/app/auth/AuthState/auth-state.service';
import { AuthErrorHandlerService } from 'src/app/auth/Errors/auth-error-handler.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:any
  test={}
  errorNotification$?:Observable<string|null>
  constructor(private fb:FormBuilder,private authservice:AuthService,private AuthError:AuthErrorHandlerService) {
   }

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
  Signup(data:any){
    this.authservice.signup(data).subscribe()
  }





}
