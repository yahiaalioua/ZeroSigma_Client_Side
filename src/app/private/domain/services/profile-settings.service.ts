import { Injectable } from '@angular/core';
import { map} from 'rxjs';
import { StoreService } from 'src/app/core/state/store.service';
import { UserInfoModel } from '../../models/user-info-model';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsService {

  userCredentials$=this.store.applicationState$.pipe(map(state=>state.UserCredentials));
  userInfo$=this.store.applicationState$.pipe(map(state=>state.Userinfo));

  constructor(
    private store:StoreService) {}
    updateUserInfo(userInfo:UserInfoModel):void{
      this.store.setState({
        ...this.store.getApplicationState(),Userinfo:{...this.store.getApplicationState().Userinfo,
           Linkedin:userInfo.Linkedin,
           Twitter:userInfo.Twitter,
           Youtube:userInfo.Youtube,
           Website:userInfo.Website,
           About_me:userInfo.About_me,
          }
      })
    }
}
