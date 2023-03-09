import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserFacadeService } from 'src/app/core/facades/user-facade.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { UserStatus } from 'src/app/core/state/state-interfaces/user-state';
import { StoreService } from 'src/app/core/state/store.service';
import { AuthResponse } from '../models/auth-model';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService  {

  invalidLoginMessage:string=''

  userStatus:Observable<UserStatus>=this.store.UserState$.pipe(map(state=>state.UserStatus));
  isLoggedIn$:Observable<boolean>=this.userStatus.pipe(map(status=>status.isLoggedIn));
  isLoggedOut$:Observable<boolean>=this.userStatus.pipe(map(status=>status.isLoggedOut));



  constructor(private store:StoreService,private localStorageService:LocalStorageService) {}

  checkState(){
    let AuthDetails:any=this.localStorageService.getItem('AuthDetails')
    AuthDetails=JSON.parse(AuthDetails);
    if(AuthDetails){
      if(AuthDetails.accessToken){
        this.store.setState({...this.store.GetUserState(), UserStatus:{isLoggedIn:true,isLoggedOut:false}
          })
      }
      else return
    }
  }
}
