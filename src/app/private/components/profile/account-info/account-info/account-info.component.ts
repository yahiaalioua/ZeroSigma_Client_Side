import { Component, OnInit } from '@angular/core';
import { map, Observable} from 'rxjs';
import { DelateAccountComponent } from '../../delateAccount/delate-account/delate-account.component';
import { ResetEmailComponent } from '../../reset-email/reset-email.component';
import { FacadeProfileAccountSettingsService } from 'src/app/private/facades/facade-profile-account-settings.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  constructor(
    private facadeProfileAccount:FacadeProfileAccountSettingsService,
     private modal:ModalService
     ) { }

  fullName$:Observable<string|undefined>|undefined;
  fullName:string=''
  email$:Observable<string|undefined>|undefined;
  ngOnInit(): void {
    this.fullName$=this.facadeProfileAccount.userCredentials$.pipe(map(credential=>credential.fullName))
    this.email$=this.facadeProfileAccount.userCredentials$.pipe(map(credentials=>credentials.email))
  }
  update(fullName:string):void{
    this.facadeProfileAccount.updateName(fullName)?.subscribe()
  }
  resetEmail(){
    this.modal.openDialog(ResetEmailComponent)
  }
  delateAccount(){
    this.modal.openDialog(DelateAccountComponent)
  }

}
