import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthStateService } from 'src/app/auth/AuthState/auth-state.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-delate-account',
  templateUrl: './delate-account.component.html',
  styleUrls: ['./delate-account.component.css']
})
export class DelateAccountComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DelateAccountComponent>,private auth:AuthService) { }
  approvalMessage:string|undefined;

  ngOnInit(): void {
  }


  delateAccount(delateForm:any){
    console.log(delateForm.password)
    let userDetails:any=localStorage.getItem('details');
    userDetails=JSON.parse(userDetails);
    if(!userDetails){
      return
    }
    else{
      if(userDetails.password===delateForm.password){
        this.auth.logout();
        this.dialogRef.close();
      }
      else if(delateForm.password==undefined || delateForm.password=='' || delateForm.password==null){
        this.approvalMessage='enter your password'
      }
      else if(delateForm.password !=userDetails.password){
        this.approvalMessage='You entered a wrong password'
      }
    }
  }

}
