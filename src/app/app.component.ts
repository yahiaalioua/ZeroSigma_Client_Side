import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { map, shareReplay, Subject, tap } from 'rxjs';
import { AuthStateService } from './auth/AuthState/auth-state.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'alphavalue';
  constructor(private auth:AuthStateService){}
  isLoggedIn$=this.auth.isLoggedIn$
  isLoggedOut$=this.auth.isLoggedOut$

  ngOnInit(){
    this.auth.checkState()
  }
}
