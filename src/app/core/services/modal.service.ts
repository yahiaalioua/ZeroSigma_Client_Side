import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { StoreService } from 'src/app/state/store.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  approvalMessage:string=''
  approvalMessageDelate:string=''

  constructor(private store:StoreService,private dialog:MatDialog) {}
  openDialog(dialogComponent:any):void{
    this.dialog.open(dialogComponent,{
      width:'400px'
    })
  }
  ResetEmail(CurrentEmail:string,NewEmail:string):void{
    let userDetails:any=localStorage.getItem('details');
    userDetails=JSON.parse(userDetails);
    if(!userDetails){
      return
    }
    else{
      if(userDetails.email===CurrentEmail){
        this.store.setState({...this.store.getUser(),UserCredentials:{...this.store.getUser().UserCredentials,email:NewEmail}});
        this.approvalMessage='Your Email has successfully been updated'
      }
      else this.approvalMessage='You entered a wrong email'
    }
  }

}
