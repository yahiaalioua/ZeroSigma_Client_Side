import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
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
    this.storage.removeItem('AuthDetails');
    this.authState.setAuthState(this.authState.initialState());
    this.router.navigate(['/login'])
  }
}
