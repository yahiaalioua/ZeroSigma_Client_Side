import { Component, OnInit } from '@angular/core';
import { FacadeAuthService } from './auth/facade/facade-auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'alphavalue';
  constructor(
    private facadeAuth:FacadeAuthService
    ){}
  isLoggedIn$=this.facadeAuth.isLoggedIn$
  isLoggedOut$=this.facadeAuth.isLoggedOut$

  ngOnInit(){
    this.facadeAuth.checkState()
  }

}
