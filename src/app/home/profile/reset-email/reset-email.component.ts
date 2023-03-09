import { Component,OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.css']
})
export class ResetEmailComponent implements OnInit{
  constructor(private modalService:ModalService) {}
  approvalMessage$?:Observable<string>;

  ngOnInit(): void {
  }
  ResetEmail(formData:any){
    console.log(formData.current_email)
    this.modalService.ResetEmail(formData.current_email,formData.new_email)
    this.approvalMessage$=this.modalService.approvalMessage$
  }




}
