import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { StoreService } from 'src/app/core/state/store.service';
import { HttpDatabaseService } from '../../data-access/http-database.service';
import { CachedUserAuthDetails } from '../../models/cached-data';


@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {

  userCredentials$=this.store.applicationState$.pipe(map(state=>state.UserCredentials));
  userInfo$=this.store.applicationState$.pipe(map(state=>state.Userinfo));

  constructor(
    private store:StoreService,
    private httpDatabase:HttpDatabaseService,
    private storage:LocalStorageService
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

  delateAccount(){
    let userDetails:string|null=localStorage.getItem('AuthDetails');
    if(!userDetails){
      return
    }
    else{
      const CachedUserDetails:CachedUserAuthDetails=JSON.parse(userDetails);
      const UserId=CachedUserDetails.payload.id
      this.httpDatabase.delateAccount(UserId).subscribe()
        this.store.setState({...this.store.InitialState});
      }
  }
}
