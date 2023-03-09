import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, tap } from 'rxjs';



@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Input()registerForm:any;
  @Input()email:any ;
  @Input()password:any;
  @Input()errorNotification$?:Observable<string|null>;
  @Output() registeredUser = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  SubmitForm(){
    this.registeredUser.emit(this.registerForm.value);
  }

}
