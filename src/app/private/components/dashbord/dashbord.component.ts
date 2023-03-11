import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from 'src/app/private/domain/services/application-state.service';
import { CachedUserAuthDetails } from '../../models/cached-data';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';
import { FacadeApplicationStateService } from '../../facades/facade-application-state.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(
    private readonly Storage:LocalStorageService,
    private readonly facadeApplicationService:FacadeApplicationStateService
    ) { }



  ngOnInit(): void {
    let cachedAuthDetails:string=this.Storage.getItem('AuthDetails');
    if (cachedAuthDetails!=null){
    let cachedAuthDetailsObject:CachedUserAuthDetails=JSON.parse(cachedAuthDetails);
      let userId:number=cachedAuthDetailsObject.payload.id
      this.facadeApplicationService.setApplicationState$(userId).subscribe();
    }
    this.facadeApplicationService.setLocalStorageState()
  }

}
