import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toastdata } from '../models/toast';



@Injectable({
  providedIn: 'root'
})
export class ToastService {
  InitialStatus:Toastdata={
    Title:'',
    Message:'',
    Type:'Success',
    Show:false
  }
  status:BehaviorSubject<null|Toastdata>=new BehaviorSubject<Toastdata|null>(this.InitialStatus);
  status$:Observable<Toastdata|null>=this.status.asObservable();

  constructor() { }
  SetToast(data:Toastdata):void{
    this.status.next(data);
    this.DismissToast()
  }
  DismissToast(): void {
    setTimeout(() => {
      this.SetToast(this.InitialStatus);
    }, 6000);
  }
}
