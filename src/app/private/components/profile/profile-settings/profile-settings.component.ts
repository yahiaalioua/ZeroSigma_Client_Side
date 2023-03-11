import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Observable } from 'rxjs';
import { Userinfo } from 'src/app/core/Models/user-state';
import { StoreService } from 'src/app/core/state/store.service';
import { FacadeProfileAccountSettingsService } from 'src/app/private/facades/facade-profile-account-settings.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  constructor(private fB:FormBuilder, private facadeProfileAccount:FacadeProfileAccountSettingsService,private store:StoreService) { }
  UserInfoForm:any
  userInfo$:Observable<Userinfo>|undefined;

  ngOnInit(): void {
    this.userInfo$=this.facadeProfileAccount.userInfo$
    this.UserInfoForm=this.fB.group({
      linkedin:(''),
      twitter:(''),
      youTube:(''),
      website:(''),
      aboutMe:(''),
    })
    this.facadeProfileAccount.userInfo$.subscribe(credential=>{
      this.UserInfoForm.setValue({
        linkedin:credential.Linkedin,
        twitter:credential.Twitter,
        youTube:credential.Youtube,
        website:credential.Website,
        aboutMe:credential.About_me,
      })
    })
  }
  update(){
    console.log(this.UserInfoForm.value)
    this.facadeProfileAccount.updateUserInfo(this.UserInfoForm.value)
  }

}
