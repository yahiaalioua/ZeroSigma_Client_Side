import { ErrorHandler, EventEmitter, Injectable } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service';


@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService implements ErrorHandler{

  constructor(private Toast:ToastService) { }
  handleError(error: unknown): void {
     this.Toast.SetToast({
      Title:'Error',
      Message:'An Error has just happened, we are already working on it. Sorry for the inconvenience',
      Type:'Error',
      Show:true
     });
     this.Toast.DismissToast()
     console.error('Error caught from Custom Error handler', error)
  }
}
