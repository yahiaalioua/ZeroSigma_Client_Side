import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { FacadeProfileAccountSettingsService } from 'src/app/private/facades/facade-profile-account-settings.service';


@Component({
  selector: 'app-delate-account',
  templateUrl: './delate-account.component.html',
  styleUrls: ['./delate-account.component.css']
})
export class DelateAccountComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DelateAccountComponent>,
    public readonly facadeProfileAccount:FacadeProfileAccountSettingsService
    ) { }
  deleteUserMessage$?:Observable<string>;

  ngOnInit(): void {
    this.deleteUserMessage$=this.facadeProfileAccount.deleteUserMessage$
  }


  delateAccount(delateForm:any){
    this.facadeProfileAccount.delateAccount(delateForm.password)?.pipe(tap(()=>this.dialogRef.close()))?.subscribe()
  }

}
