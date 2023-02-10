import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthStateService } from 'src/app/auth/AuthState/auth-state.service';
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
  constructor(private fb:FormBuilder,private auth:AuthStateService) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required, Validators.minLength(7)]]
    })
  }


  get email():void{
    return this.loginForm.get('email')
  }
  get password():void{
    return this.loginForm.get('password')
  }


  Login(data:any){
    this.auth.Login(data)
  }
}
