import { Injectable } from '@angular/core';
import { ApplicationStateService } from '../domain/services/application-state.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeApplicationStateService {

  constructor(
    private readonly applicationState:ApplicationStateService
  ) { }

  setApplicationState$(id:number){
    return this.applicationState.setApplicationState$(id)
  }
  setLocalStorageState(){
    return this.applicationState.setLocalStorageState()
  }
}
