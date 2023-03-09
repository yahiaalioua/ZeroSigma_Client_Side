import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';
import { StoreService } from 'src/app/core/state/store.service';
import { CachedUserAuthDetails } from '../Models/cached-data';
import { HttpCallsService } from './http/http-database/http-calls.service';
import { LocalStorageService } from './local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  approvalMessage:BehaviorSubject<string>=new BehaviorSubject<string>("")
  approvalMessage$:Observable<string>=this.approvalMessage.asObservable()
  approvalMessageDelate:string=''

  constructor(
    private store:StoreService,private dialog:MatDialog,
    private httpCalls:HttpCallsService,
    private storage:LocalStorageService
    ) {}
  openDialog(dialogComponent:any):void{
    this.dialog.open(dialogComponent,{
      width:'400px'
    })
  }
  putEmail(id:number,email:string){
    return this.httpCalls.putEmail(id,email).pipe(
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
  ResetEmail(CurrentEmail:string,NewEmail:string):void{
    let userDetails:string|null=localStorage.getItem('AuthDetails');
    if(!userDetails){
      return
    }
    else{
      const CachedUserDetails:CachedUserAuthDetails=JSON.parse(userDetails);
      const UserId=CachedUserDetails.payload.id
      if(CachedUserDetails.payload.email===CurrentEmail){
        this.putEmail(UserId,NewEmail).subscribe()
        this.store.setState({...this.store.GetUserState(),UserCredentials:{...this.store.GetUserState().UserCredentials,email:NewEmail}});
      }
      else if(CachedUserDetails.payload.email!=CurrentEmail){
        this.approvalMessage.next('current email is wrong')
      }
      else return;
    }
  }
}
