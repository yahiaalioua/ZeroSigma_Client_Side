import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, observable } from 'rxjs';
import { AuthStateService } from 'src/app/auth/AuthState/auth-state.service';
import { UserFacadeService } from 'src/app/core/facades/user-facade.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { UserCredentials, UserState } from 'src/app/state/stateInterfaces/user-state';
import { StoreService } from 'src/app/state/store.service';
import { DelateAccountComponent } from '../../delateAccount/delate-account/delate-account.component';
import { ResetEmailComponent } from '../../reset-email/reset-email.component';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  constructor(private userFacade:UserFacadeService,private modalService:ModalService, private modal:ModalService) { }
  fullName$:Observable<string|undefined>|undefined;
  fullName:string=''
  email$:Observable<string|undefined>|undefined;
  ngOnInit(): void {
    this.fullName$=this.userFacade.userCredentials$.pipe(map(credential=>credential.fullName))
    this.email$=this.userFacade.userCredentials$.pipe(map(credentials=>credentials.email))
  }
  update(fullName:string):void{
    this.userFacade.updateName(fullName)
  }
  resetEmail(){
    this.modal.openDialog(ResetEmailComponent)
  }
  delateAccount(){
    this.modal.openDialog(DelateAccountComponent)
  }

}
