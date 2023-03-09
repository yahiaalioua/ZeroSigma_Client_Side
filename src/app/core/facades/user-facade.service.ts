import { EventEmitter, Injectable } from '@angular/core';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { BehaviorSubject, catchError, map, Observable, observable, of, switchMap, tap } from 'rxjs';
import { Userinfo, UserState } from 'src/app/core/state/state-interfaces/user-state';
import { StoreService } from 'src/app/core/state/store.service';
import { CachedUserAuthDetails } from '../Models/cached-data';
import { HttpCallsService } from '../services/http/http-database/http-calls.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {
  userCredentials$=this.store.UserState$.pipe(map(state=>state.UserCredentials));
  userInfo$=this.store.UserState$.pipe(map(state=>state.Userinfo));


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

  constructor(
    private store:StoreService,
    private httpCalls:HttpCallsService,
    private storage:LocalStorageService
    ) {}

  checkState(){
    return this.store.UserState$.subscribe(console.log);
  }

  putName(id:number,name:string){
    return this.httpCalls.putName(id,name).pipe(
      tap((val:any)=>{
        this.updateLocalStorageName(name)
      }
      ),switchMap(()=>this.store.localStorageState$.pipe(
        tap(val=>this.storage.setItem('AuthDetails',val))
      )),
      catchError(val=>{
        return of(null)
      }))
  }
  updateLocalStorageName(name:string):void{
    return this.store.setLocalStorageState({...this.store.getLocalStorageState(),payload:{
      ...this.store.getLocalStorageState().payload,name:name  }
    })
  }
  updateName(name:string){
    let userDetails:string|null=localStorage.getItem('AuthDetails');
    if(!userDetails){
      return
    }
    else{
      const CachedUserDetails:CachedUserAuthDetails=JSON.parse(userDetails);
      const UserId=CachedUserDetails.payload.id
      this.putName(UserId,name).subscribe()
        this.store.setState({...this.store.GetUserState(),UserCredentials:{...this.store.GetUserState().UserCredentials,fullName:name}});
      }
  }


}
