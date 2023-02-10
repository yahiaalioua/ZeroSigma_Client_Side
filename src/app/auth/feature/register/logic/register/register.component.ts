import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, Subject, tap } from 'rxjs';
import { register } from '../../Interfaces/register';
import { AuthStateService } from 'src/app/auth/AuthState/auth-state.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:any
  test={}
  constructor(private fb:FormBuilder, private auth:AuthStateService) {
   }

  ngOnInit(): void {
    this.registerForm=this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required, Validators.minLength(7)]]
    })
  }
  redirectToHome(){
    /* this.router.navigateByUrl('/login') */
  }
  get email():void{
    return this.registerForm.get('email')
  }
  get password():void{
    return this.registerForm.get('password')
  }
  get(data:any){
    console.log(data)
    this.auth.Register(data)
  }





}
