import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private dialog:MatDialog,
    ) {}

  openDialog(dialogComponent:any):void{
    this.dialog.open(dialogComponent,{
      width:'400px'
    })
  }

}
