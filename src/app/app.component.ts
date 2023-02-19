import { Component, OnInit } from '@angular/core';
import { AuthStateService } from './auth/AuthState/auth-state.service';
import { AuthErrorHandlerService } from './auth/Errors/auth-error-handler.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'alphavalue';
  constructor(private auth:AuthStateService,private AuthErrors:AuthErrorHandlerService){}
  isLoggedIn$=this.auth.isLoggedIn$
  isLoggedOut$=this.auth.isLoggedOut$

  ngOnInit(){
    this.auth.checkState()
  }
  RemoveAuthErrors():void{
    this.AuthErrors.SetSignUpError(null);
    this.AuthErrors.SetLoginError(null);
  }
}
