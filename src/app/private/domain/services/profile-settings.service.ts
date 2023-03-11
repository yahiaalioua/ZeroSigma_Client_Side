import { Injectable } from '@angular/core';
import { map} from 'rxjs';
import { HttpCallsService } from 'src/app/core/services/http/http-database/http-calls.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { StoreService } from 'src/app/core/state/store.service';
import { UserInfoModel } from '../../models/user-info-model';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsService {

  userCredentials$=this.store.UserState$.pipe(map(state=>state.UserCredentials));
  userInfo$=this.store.UserState$.pipe(map(state=>state.Userinfo));

  constructor(
    private store:StoreService,
    private httpCalls:HttpCallsService,
    private storage:LocalStorageService
    ) {}
    updateUserInfo(userInfo:UserInfoModel):void{
      this.store.setState({
        ...this.store.GetUserState(),Userinfo:{...this.store.GetUserState().Userinfo,
           Linkedin:userInfo.Linkedin,
           Twitter:userInfo.Twitter,
           Youtube:userInfo.Youtube,
           Website:userInfo.Website,
           About_me:userInfo.About_me,
          }
      })
    }
}
