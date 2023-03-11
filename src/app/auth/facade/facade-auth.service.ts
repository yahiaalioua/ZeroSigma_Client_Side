import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserState } from 'src/app/core/state/state-interfaces/user-state';
import { SpinnerService } from 'src/app/Shared/services/spinner.service';
import { AuthResponse } from '../models/auth-response';
import { login } from '../models/login';
import { register } from '../models/register';
import { AuthStateService } from '../services/auth-state.service';
import { LogOutService } from '../services/log-out.service';
import { LoginService } from '../services/login.service';
import { SignUpService } from '../services/sign-up.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeAuthService {

  constructor(
    private loginService:LoginService,
    private logOutService:LogOutService,
    private signUpService:SignUpService,
    private authState:AuthStateService,
    private spinner:SpinnerService
  ) { }

  isLoggedIn$=this.authState.isLoggedIn$

  isLoggedOut$=this.authState.isLoggedOut$

  loadSpinner:BehaviorSubject<boolean>=this.spinner.isLoadding

  signUp({name,email,password}:register){
    return this.signUpService.signup({name,email,password})
  }
  login({email,password}:login){
    return this.loginService.login({email,password})
  }
  logout(){
    return this.logOutService.logout()
  }
  setAuthState(newState:UserState){
    return this.authState.setAuthState(newState)
  }
  getCurrentState(){
    return this.authState.getCurrentState()
  }
  setLocalStorageState(newState:AuthResponse){
    return this.authState.setLocalStorageState(newState)
  }
  checkState(){
    return this.authState.checkState()
  }
}
