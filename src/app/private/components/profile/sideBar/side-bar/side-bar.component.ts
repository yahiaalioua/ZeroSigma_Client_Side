import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FacadeProfileAccountSettingsService } from 'src/app/private/facades/facade-profile-account-settings.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private facadeProfileAccount:FacadeProfileAccountSettingsService) { }
  @Input()fullName$:Observable<string|undefined>|undefined;

  ngOnInit(): void {
    this.fullName$=this.facadeProfileAccount.userCredentials$.pipe(map(credential=>credential.fullName));
  }

}
