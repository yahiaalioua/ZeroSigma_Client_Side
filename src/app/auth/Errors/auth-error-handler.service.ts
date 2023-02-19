import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthErrorHandlerService {
  private SignUpErrorStore:BehaviorSubject<string|null>=new BehaviorSubject<string|null>(null)
  SignUpError$:Observable<string|null>=this.SignUpErrorStore.asObservable();
  private LoginErrorStore:BehaviorSubject<string|null>=new BehaviorSubject<string|null>(null)
  LoginError$:Observable<string|null>=this.LoginErrorStore.asObservable();

  constructor() { }
  SetSignUpError(ErrMsg:string|null){
    this.SignUpErrorStore.next(ErrMsg)
  };
  SetLoginError(ErrMsg:string|null){
    this.LoginErrorStore.next(ErrMsg)
  };

  HandleSignUpErrorMessage(ErrMsg:string){
    if(ErrMsg=="Email already exist"){
      this.SetSignUpError("This user aleady exist")
    }
    else if(ErrMsg=="Your password should be at least 8 characters"){
      this.SetSignUpError("Your password should be at least 8 characters")
    }
    else if(ErrMsg=="Your password should contain at least one number and one upper and lowercase letter"){
      this.SetSignUpError("Your password should contain at least one number and one upper and lowercase letter")
    }
    else if(ErrMsg=="Your password should contain at least one special character"){
      this.SetSignUpError("Your password should contain at least one special character")
    }
    else if(ErrMsg=="Your password should be at least 8 charactersYour password should contain at least one number and one upper and lowercase letterYour password should contain at least one special character"){
      this.SetSignUpError("Your password should contain numbers ,upper and lowercase letters and special characters")
    }
    else if(ErrMsg=="Your password should contain at least one number and one upper and lowercase letterYour password should contain at least one special character"){
      this.SetSignUpError("Your password should contain numbers ,upper and lowercase letters and special characters")
    }
    else this.SetSignUpError("Something went wrong, try again later")

  }
  HandleLoginErrorMessage(ErrMsg:string){
    if(ErrMsg=="Wrong password"){
      this.SetLoginError("You entered the wrong password")
    }
    if(ErrMsg=="User do not exist"){
      this.SetLoginError("This user do not exist")
    }
  }
}
