import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { localStorageState } from '../Models/local-storage-state';
import { UserState } from '../Models/user-state';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  InitialState:UserState={
    UserCredentials:{
    id:undefined,
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
  localStorageInitialState:localStorageState={
    accessToken:'',
    payload:{
      id:undefined,
      email:'',
      name:''
    },
    refreshToken:''
  }
  private readonly UserState:BehaviorSubject<UserState>=new BehaviorSubject<UserState>(this.InitialState);
  UserState$:Observable<UserState>=this.UserState.asObservable()
  constructor() { }
  setState(NewUserState:UserState):void{
    this.UserState.next(NewUserState)
  }
  GetUserState():UserState{
    return this.UserState.getValue()
  }
  private localStorageState:BehaviorSubject<localStorageState>=new BehaviorSubject<localStorageState>(this.localStorageInitialState)
  localStorageState$:Observable<localStorageState>=this.localStorageState.asObservable();

  setLocalStorageState(state:localStorageState):void{
    this.localStorageState.next(state)
  }
  getLocalStorageState():localStorageState{
    return this.localStorageState.getValue()
  }
}
