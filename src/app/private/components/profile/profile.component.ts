import { Component, OnInit } from '@angular/core';
import { map, Observable} from 'rxjs';
import { ModalService } from 'src/app/Shared/services/modal.service';
import { FacadeProfileAccountSettingsService } from '../../facades/facade-profile-account-settings.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private modalService:ModalService,private facadeProfileAccount:FacadeProfileAccountSettingsService) { }
  fullName$:Observable<string|undefined>|undefined;


  ngOnInit(): void {
    this.fullName$=this.facadeProfileAccount.userCredentials$.pipe(map(credential=>credential.fullName));
  }

}
