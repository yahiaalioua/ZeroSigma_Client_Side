import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-delate-account',
  templateUrl: './delate-account.component.html',
  styleUrls: ['./delate-account.component.css']
})
export class DelateAccountComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DelateAccountComponent>) { }
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
