import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/auth/AuthState/auth-state.service';

@Component({
  selector: 'app-nav-bar-container-comp',
  templateUrl: './nav-bar-container-comp.component.html',
  styleUrls: ['./nav-bar-container-comp.component.css']
})
export class NavBarContainerCompComponent implements OnInit {

  constructor(private auth:AuthStateService) { }

  ngOnInit(): void {
  }
  logout(){
    this.auth.logout()
  }
}
