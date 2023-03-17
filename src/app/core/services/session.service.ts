import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from 'src/app/auth/models/auth-response';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { AuthDetails } from '../models/auth-details';
import { StoreService } from '../state/store.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private readonly storage:LocalStorageService,
    private readonly http:HttpClient,
    private readonly store:StoreService
    ) { }

  newRefreshTokenSession(){
    let authDetails:string=this.storage.getItem('AuthDetails')
    const AuthDetails:AuthDetails=JSON.parse(authDetails)
    const RefreshToken:string=AuthDetails.refreshToken
    return this.http.post<AuthResponse>(`https://localhost:7063/api/users/session/token`,{"refreshToken": RefreshToken})
  }
  storeNewSession(refreshToken:string,accessToken:string){
    this.storage.setItem('AuthDetails',{
      ...this.store.getLocalStorageState(),
      refreshToken:refreshToken,accessToken:accessToken})
  }
}
