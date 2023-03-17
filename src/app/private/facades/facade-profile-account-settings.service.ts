import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountSettingsService } from '../domain/services/account-settings.service';
import { ProfileSettingsService } from '../domain/services/profile-settings.service';
import { ResetEmailService } from '../domain/services/reset-email.service';
import { UserInfoModel } from '../models/user-info-model';

@Injectable({
  providedIn: 'root'
})
export class FacadeProfileAccountSettingsService {

  constructor(
    private readonly accountSettings:AccountSettingsService,
    private readonly profileSettings:ProfileSettingsService,
    private readonly resetEmailService:ResetEmailService
  ) { }

  userCredentials$=this.profileSettings.userCredentials$
  userInfo$=this.profileSettings.userInfo$
  approvalMessage$:Observable<string>=this.resetEmailService.approvalMessage$
  deleteUserMessage$:Observable<string>=this.accountSettings.delateUserMessage$

  updateName(name:string){
    return this.accountSettings.updateName(name)
  }
  updateUserInfo(userInfo:UserInfoModel){
    return this.profileSettings.updateUserInfo(userInfo)
  }

  resetEmail(currentEmail:string,newEmail:string){
    return this.resetEmailService.ResetEmail(currentEmail,newEmail)
  }
  delateAccount(password:string){
    return this.accountSettings.delateAccount(password)
  }
}
