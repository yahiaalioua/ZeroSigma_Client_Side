import { Injectable } from '@angular/core';
import { map} from 'rxjs';
import { userInfoResponse } from 'src/app/private/models/user-responses';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { localStorageState } from '../../../core/Models/local-storage-state';
import { StoreService } from '../../../core/state/store.service';
import { HttpDatabaseService } from '../../data-access/http-database.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {

  constructor(
    private httpDatabaseService:HttpDatabaseService,
    private store:StoreService,
    private storage:LocalStorageService) { }

  setApplicationState$(id:number){
    return this.httpDatabaseService.GetUserById(id).pipe(map((UserData:userInfoResponse)=>{
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
