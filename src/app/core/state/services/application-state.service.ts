import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { HttpAuthServiceService } from 'src/app/auth/services/Http/http-auth-service.service';
import { userInfoResponse } from 'src/app/core/Models/user-responses';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { localStorageState } from '../state-interfaces/local-storage-state';
import { StoreService } from '../store.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {

  constructor(
    private httpAuthService:HttpAuthServiceService,
    private store:StoreService,
    private storage:LocalStorageService) { }

  SetApplicationState$(id:number){
    return this.httpAuthService.GetUserById(id).pipe(map((UserData:userInfoResponse)=>{
        this.store.setState({...this.store.GetUserState(),UserCredentials:{
          ...this.store.GetUserState().UserCredentials, fullName:UserData.name,
          email:UserData.email,id:UserData.id
        },Userinfo:{
          FullName:UserData.name,Linkedin:UserData.linkedin,Youtube:UserData.youTube,
          Website:UserData.website,About_me:UserData.aboutMe
        }})
      }
    ))
  }
  setLocalStorageState(){
    const LocalStorageData:string=this.storage.getItem('AuthDetails')
    const LocalStorageState:localStorageState=JSON.parse(LocalStorageData);
    this.store.setLocalStorageState(LocalStorageState);
  }

}
