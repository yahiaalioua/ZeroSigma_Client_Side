import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { UserFacadeService } from 'src/app/core/facades/user-facade.service';
import { Userinfo } from 'src/app/core/Models/user-state';
import { StoreService } from 'src/app/core/state/store.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  constructor(private fB:FormBuilder, private userFacade:UserFacadeService,private store:StoreService) { }
  UserInfoForm:any
  userInfo$:Observable<Userinfo>|undefined;

  ngOnInit(): void {
    this.userInfo$=this.userFacade.userInfo$
    this.UserInfoForm=this.fB.group({
      linkedin:(''),
      twitter:(''),
      youTube:(''),
      website:(''),
      aboutMe:(''),
    })
    this.userFacade.userInfo$.subscribe(credential=>{
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
    this.userFacade.updateUserInfo(this.UserInfoForm.value)
  }

}
