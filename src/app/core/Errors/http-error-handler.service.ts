import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/Shared/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  constructor(private readonly toast:ToastService) { }
  HandleResolverError(message:string){
    this.toast.SetToast({Title:'Error',Message:message,Type:'Error',Show:true})
  }
}
