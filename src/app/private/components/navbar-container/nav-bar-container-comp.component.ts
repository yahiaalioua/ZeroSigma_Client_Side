import { Component, OnInit } from '@angular/core';
import { FacadeAuthService } from 'src/app/auth/facade/facade-auth.service';

@Component({
  selector: 'app-nav-bar-container-comp',
  templateUrl: './nav-bar-container-comp.component.html',
  styleUrls: ['./nav-bar-container-comp.component.css']
})
export class NavBarContainerCompComponent{

  constructor(private facadeAuthService:FacadeAuthService) { }

  logout(){
    this.facadeAuthService.logout()
  }
}
