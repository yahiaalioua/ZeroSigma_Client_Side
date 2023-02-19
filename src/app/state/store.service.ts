import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserState } from './stateInterfaces/user-state';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  currentState:UserState={
    UserCredentials:{
    email:'',
    fullName:''
    },
    Userinfo:{
      FullName:'',
      Linkedin:'',
      Youtube:'',
      Twitter:'',
      Website:'',
      About_me:''
    },
    UserStatus:{
      isLoggedIn:false,
      isLoggedOut:true
    }
  }
  private UserState:BehaviorSubject<UserState>=new BehaviorSubject<UserState>(this.currentState);
  UserState$:Observable<UserState>=this.UserState.asObservable()
  constructor() { }
  setState(NewUserState:UserState):void{
    this.UserState.next(NewUserState)
  }
  getUser():UserState{
    return this.UserState.getValue()
  }
}
