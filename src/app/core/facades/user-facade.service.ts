import { EventEmitter, Injectable } from '@angular/core';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { BehaviorSubject, map, Observable, observable } from 'rxjs';
import { Userinfo, UserState } from 'src/app/state/stateInterfaces/user-state';
import { StoreService } from 'src/app/state/store.service';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {
  userCredentials$=this.store.UserState$.pipe(map(state=>state.UserCredentials));
  userInfo$=this.store.UserState$.pipe(map(state=>state.Userinfo));

  updateName(newState:string):void{
    this.store.setState({...this.store.GetUserState(),Userinfo:{...this.store.GetUserState().Userinfo, FullName:newState},UserCredentials:{...this.store.GetUserState().UserCredentials,fullName:newState}})
  }
  updateUserInfo(userInfo:any):void{
    const{linkedin,twitter,youTube,website,aboutMe}=userInfo
    this.store.setState({
      ...this.store.GetUserState(),Userinfo:{...this.store.GetUserState().Userinfo,
         Linkedin:linkedin,
         Twitter:twitter,
         Youtube:youTube,
         Website:website,
         About_me:aboutMe,
        }
    })
  }

  constructor(private store:StoreService) {}
  checkState(){
    return this.store.UserState$.subscribe(console.log);
  }


}
