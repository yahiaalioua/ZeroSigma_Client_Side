
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, tap } from 'rxjs';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input()loginForm:any;
  @Input()email!:any;
  @Input()password!:any;
  @Input()errorNotification$?:Observable<string|null>;
  @Output() LoginData =new EventEmitter
  constructor() { }

  ngOnInit(): void {
  }
  Login(){
    this.LoginData.emit(this.loginForm.value)
  }
}
