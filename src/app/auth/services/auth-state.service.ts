import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { ApplicationState, UserStatus } from 'src/app/core/models/application-state';
import { StoreService } from 'src/app/core/state/store.service';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService  {

  invalidLoginMessage:string=''

  userStatus:Observable<UserStatus>=this.store.applicationState$.pipe(map(state=>state.UserStatus));
  isLoggedIn$:Observable<boolean>=this.userStatus.pipe(map(status=>status.isLoggedIn));
  isLoggedOut$:Observable<boolean>=this.userStatus.pipe(map(status=>status.isLoggedOut));



  constructor(private store:StoreService,private localStorageService:LocalStorageService) {}
  initialState(){
    return this.store.InitialState
  }
  setAuthState(newState:ApplicationState){
    return this.store.setState(newState)
  }
  getCurrentState(){
    return this.store.getApplicationState()
  }
  setLocalStorageState(newState:AuthResponse){
    return this.store.setLocalStorageState(newState)
  }
  checkState(){
    let AuthDetails:any=this.localStorageService.getItem('AuthDetails')
    AuthDetails=JSON.parse(AuthDetails);
    if(AuthDetails){
      if(AuthDetails.accessToken){
        this.setAuthState({...this.store.getApplicationState(), UserStatus:{isLoggedIn:true,isLoggedOut:false}
          })
      }
      else return
    }
  }
}
