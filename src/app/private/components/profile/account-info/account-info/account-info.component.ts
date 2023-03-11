import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, observable } from 'rxjs';
import { AuthStateService } from 'src/app/auth/services/auth-state.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { UserCredentials, UserState } from 'src/app/core/Models/user-state';
import { StoreService } from 'src/app/core/state/store.service';
import { DelateAccountComponent } from '../../delateAccount/delate-account/delate-account.component';
import { ResetEmailComponent } from '../../reset-email/reset-email.component';
import { FacadeProfileAccountSettingsService } from 'src/app/private/facades/facade-profile-account-settings.service';

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
    this.facadeProfileAccount.updateName(fullName)
  }
  resetEmail(){
    this.modal.openDialog(ResetEmailComponent)
  }
  delateAccount(){
    this.modal.openDialog(DelateAccountComponent)
  }

}
