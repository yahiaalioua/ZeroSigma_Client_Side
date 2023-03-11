import { Injectable } from '@angular/core';
import { AccountSettingsService } from '../domain/services/account-settings.service';
import { ProfileSettingsService } from '../domain/services/profile-settings.service';
import { UserInfoModel } from '../models/user-info-model';

@Injectable({
  providedIn: 'root'
})
export class FacadeProfileAccountSettingsService {

  constructor(
    private readonly accountSettings:AccountSettingsService,
    private readonly profileSettings:ProfileSettingsService
  ) { }

  userCredentials$=this.profileSettings.userCredentials$
  userInfo$=this.profileSettings.userInfo$

  updateName(name:string){
    return this.accountSettings.updateName(name)
  }
  updateUserInfo(userInfo:UserInfoModel){
    return this.profileSettings.updateUserInfo(userInfo)
  }
}
