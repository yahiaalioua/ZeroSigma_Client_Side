import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from 'src/app/private/domain/services/application-state.service';
import { CachedUserAuthDetails } from '../../models/cached-data';
import { LocalStorageService } from '../../../Shared/services/local-storage.service';
import { FacadeApplicationStateService } from '../../facades/facade-application-state.service';
import { FacadeStockDataService } from '../../facades/facade-stock-data.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(
    private readonly storage:LocalStorageService,
    private readonly facadeApplicationService:FacadeApplicationStateService,
    private readonly facadeStockData:FacadeStockDataService
    ) { }



  ngOnInit(): void {
    let cachedAuthDetails:string=this.storage.getItem('AuthDetails');
    if (cachedAuthDetails!=null){
    let cachedAuthDetailsObject:CachedUserAuthDetails=JSON.parse(cachedAuthDetails);
      let userId:number=cachedAuthDetailsObject.payload.id
      this.facadeApplicationService.setApplicationUserState$(userId).subscribe();
    }
    this.facadeApplicationService.setLocalStorageState()
    this.facadeStockData.setStockDataState().subscribe()
    this.facadeStockData.setValuationDataState().subscribe()

  }

}
