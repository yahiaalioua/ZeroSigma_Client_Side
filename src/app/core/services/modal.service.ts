import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { StoreService } from 'src/app/core/state/store.service';
import { HttpDatabaseService } from 'src/app/private/data-access/http-database.service';
import { LocalStorageService } from '../../Shared/services/local-storage.service';

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
