import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserFacadeService } from 'src/app/core/facades/user-facade.service';
import { StorageService } from 'src/app/core/services/Storage/storage.service';
import { UserStatus } from 'src/app/state/stateInterfaces/user-state';
import { StoreService } from 'src/app/state/store.service';
import { login } from '../feature/login/interfaces/loginInterface';
import { register } from '../feature/register/Interfaces/register';
import { AuthResponse } from '../Models/AuthModel';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService  {

  invalidLoginMessage:string=''

  userStatus:Observable<UserStatus>=this.store.UserState$.pipe(map(state=>state.UserStatus));
  isLoggedIn$:Observable<boolean>=this.userStatus.pipe(map(status=>status.isLoggedIn));
  isLoggedOut$:Observable<boolean>=this.userStatus.pipe(map(status=>status.isLoggedOut));



  constructor(private store:StoreService,private StorageService:StorageService) {}

  checkState(){
    let AuthDetails:any=this.StorageService.getItem('AuthDetails')
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
