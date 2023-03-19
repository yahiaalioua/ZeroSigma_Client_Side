import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { localStorageState } from '../models/local-storage-state';
import { ApplicationState,} from '../models/application-state';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  InitialState:ApplicationState={
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
    },
    StockData:{
      price:0,
      companyName:'',
      ticker:'',
      date:new Date(),
      change:0,
      series:[]
    },
    Valuation:{
      intrinsicValue:0,
      percentageDifference:0
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
  private readonly ApplicationState:BehaviorSubject<ApplicationState>=new BehaviorSubject<ApplicationState>(this.InitialState);
  applicationState$:Observable<ApplicationState>=this.ApplicationState.asObservable()
  constructor() { }
  setState(newUserState:ApplicationState):void{
    this.ApplicationState.next(newUserState)
  }
  getApplicationState():ApplicationState{
    return this.ApplicationState.getValue()
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
