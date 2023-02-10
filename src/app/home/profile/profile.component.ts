import { Component, OnInit } from '@angular/core';
import { map, Observable, pluck } from 'rxjs';
import { UserFacadeService } from 'src/app/core/facades/user-facade.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private modalService:ModalService,private userFacade:UserFacadeService) { }
  fullName$:Observable<string|undefined>|undefined;

  
  ngOnInit(): void {
    this.fullName$=this.userFacade.userCredentials$.pipe(map(credential=>credential.fullName));
  }

}
