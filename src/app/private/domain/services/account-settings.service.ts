import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, map, Observable, of, switchMap, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { StoreService } from 'src/app/core/state/store.service';
import { HttpDatabaseService } from '../../data-access/http-database.service';
import { CachedUserAuthDetails } from '../../models/cached-data';
import { FacadeAuthService } from 'src/app/auth/facade/facade-auth.service';



@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {

  userCredentials$=this.store.applicationState$.pipe(map(state=>state.UserCredentials));
  userInfo$=this.store.applicationState$.pipe(map(state=>state.Userinfo));
  delateUserMessage:BehaviorSubject<string>=new BehaviorSubject<string>('');
  delateUserMessage$:Observable<string>=this.delateUserMessage.asObservable();

  constructor(
    private store:StoreService,
    private httpDatabase:HttpDatabaseService,
    private storage:LocalStorageService,
    private readonly facadeAuth:FacadeAuthService
    ) {}

  putName(id:number,name:string){
    return this.httpDatabase.putName(id,name).pipe(
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
      this.store.setState({...this.store.getApplicationState(),
      UserCredentials:{...this.store.getApplicationState().UserCredentials,fullName:name}});
      return this.putName(UserId,name)
      }
  }

  delateAccount(password:string){
    let userDetails:string|null=localStorage.getItem('AuthDetails');
    if(!userDetails){
      return
    }
    else{
      const CachedUserAuthDetails:CachedUserAuthDetails=JSON.parse(userDetails);
      const UserId=CachedUserAuthDetails.payload.id
      return this.httpDatabase.verifyPassword(UserId,password).pipe(switchMap(()=>{
        this.delateUserMessage.next('Account succesfully delated, you will be logged out')
        return this.httpDatabase.delateAccount(UserId).pipe(delay(6000),map(()=>this.facadeAuth.logout()))
      }),catchError(err=>{
        this.delateUserMessage.next('Wrong Password')
        return of(null)
      }))
  }
}}
