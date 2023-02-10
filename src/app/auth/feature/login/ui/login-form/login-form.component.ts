import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthStateService } from 'src/app/auth/AuthState/auth-state.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input()loginForm:any;
  @Input()email!:any;
  @Input()password!:any;
  @Output() LoginData =new EventEmitter
  constructor(private auth:AuthStateService) { }
  invalidUserMessage=this.auth.invalidLoginMessage

  ngOnInit(): void {
  }
  Login(){
    this.LoginData.emit(this.loginForm.value)
    this.invalidUserMessage=this.auth.invalidLoginMessage

  }
}
