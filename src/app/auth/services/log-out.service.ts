import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { AuthStateService } from './auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {

  constructor(
    private storage:LocalStorageService,
    private router:Router,
    private authState:AuthStateService,
  ) { }

  logout(){
    this.authState.setAuthState(this.authState.initialState());
    this.storage.removeItem('AuthDetails');
    this.router.navigate(['/login'])
  }
}
