import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpCallsService } from 'src/app/core/services/http/http-database/http-calls.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { StoreService } from 'src/app/core/state/store.service';
import { CachedUserAuthDetails } from '../../models/cached-data';


@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {

  userCredentials$=this.store.UserState$.pipe(map(state=>state.UserCredentials));
  userInfo$=this.store.UserState$.pipe(map(state=>state.Userinfo));

  constructor(
    private store:StoreService,
    private httpCalls:HttpCallsService,
    private storage:LocalStorageService
    ) {}

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
