import { Component,OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { FacadeProfileAccountSettingsService } from 'src/app/private/facades/facade-profile-account-settings.service';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.css']
})
export class ResetEmailComponent implements OnInit{
  constructor(private readonly facadeProfileAccount:FacadeProfileAccountSettingsService) {}
  approvalMessage$?:Observable<string>;

  ngOnInit(): void {
  }
  ResetEmail(formData:any){
    console.log(formData.current_email)
    this.facadeProfileAccount.resetEmail(formData.current_email,formData.new_email)?.subscribe()
    this.approvalMessage$=this.facadeProfileAccount.approvalMessage$
  }
}
