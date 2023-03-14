import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  toastMessage?:Observable<string|undefined>;
  title?:Observable<string|undefined>;
  ShowToast$?: Observable<boolean|undefined>;
  ToastType$?:Observable<string|undefined>;

  constructor(private toastSer:ToastService) { }

  ngOnInit(): void {
    this.ShowToast$=this.toastSer.status$.pipe(map(data=>data?.Show))
    this.toastMessage=this.toastSer.status$.pipe(map(data=>data?.Message))
    this.title=this.toastSer.status$.pipe(map(data=>data?.Title))
    this.ToastType$=this.toastSer.status$.pipe(map(data=>data?.Type))
  }
  close(){
    this.toastSer.status.next(this.toastSer.InitialStatus);
  }

}
