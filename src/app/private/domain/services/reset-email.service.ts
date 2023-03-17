import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { StoreService } from 'src/app/core/state/store.service';
import { HttpDatabaseService } from 'src/app/private/data-access/http-database.service';
import { CachedUserAuthDetails } from '../../models/cached-data';

@Injectable({
  providedIn: 'root'
})
export class ResetEmailService {

  approvalMessage:BehaviorSubject<string>=new BehaviorSubject<string>("")
  approvalMessage$:Observable<string>=this.approvalMessage.asObservable()

  constructor(
    private store:StoreService,
    private httpDatabase:HttpDatabaseService,
    private storage:LocalStorageService
    ) {}

  putEmail(id:number,email:string){
    return this.httpDatabase.putEmail(id,email).pipe(
      tap((val:any)=>{
        this.store.setLocalStorageState({...this.store.getLocalStorageState(),payload:{
          ...this.store.getLocalStorageState().payload,email:email
        }})
        this.approvalMessage.next(val.message)
      }
      ),switchMap(()=>this.store.localStorageState$.pipe(
        tap(val=>this.storage.setItem('AuthDetails',val))
      )),
      catchError(val=>{
        this.approvalMessage.next(val.error.message)
        return of(null)
      }))
  }
  ResetEmail(CurrentEmail:string,NewEmail:string){
    let userDetails:string|null=localStorage.getItem('AuthDetails');
    if(!userDetails){
      return
    }
    else{
      const CachedUserDetails:CachedUserAuthDetails=JSON.parse(userDetails);
      const UserId=CachedUserDetails.payload.id
      if(CachedUserDetails.payload.email===CurrentEmail){
        this.store.setState({...this.store.getApplicationState(),UserCredentials:{...this.store.getApplicationState().UserCredentials,email:NewEmail}});
        return this.putEmail(UserId,NewEmail)
      }
      else if(CachedUserDetails.payload.email!=CurrentEmail){
        this.approvalMessage.next('current email is wrong')
      }
      else return;
    }
    return
  }
}
