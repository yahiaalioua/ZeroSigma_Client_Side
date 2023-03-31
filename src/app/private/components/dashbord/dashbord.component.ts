import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationStateService } from 'src/app/private/domain/services/application-state.service';
import { CachedUserAuthDetails } from '../../models/cached-data';
import { LocalStorageService } from '../../../Shared/services/local-storage.service';
import { FacadeApplicationStateService } from '../../facades/facade-application-state.service';
import { FacadeStockDataService } from '../../facades/facade-stock-data.service';
import { Subscription, tap } from 'rxjs';
import { HttpFinancialModelingApiService } from '../../data-access/http-financial-modeling-api.service';
import { StockDataHelperService } from 'src/app/core/services/utils/stock-data-helper.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit,OnDestroy {

  constructor(
    private readonly storage:LocalStorageService,
    private readonly facadeApplicationService:FacadeApplicationStateService,
    private readonly facadeStockData:FacadeStockDataService,
    private readonly stocks:HttpFinancialModelingApiService,
    private readonly check:StockDataHelperService
    ) { }
    stockDataState$?:Subscription
    IntrinsicValueDataState$?:Subscription
    PercentPriceDifferenceDataState$?:Subscription

  ngOnInit(): void {
    let cachedAuthDetails:string=this.storage.getItem('AuthDetails');
    if (cachedAuthDetails!=null){
    let cachedAuthDetailsObject:CachedUserAuthDetails=JSON.parse(cachedAuthDetails);
      let userId:number=cachedAuthDetailsObject.payload.id
      this.facadeApplicationService.setApplicationUserState$(userId).subscribe();
    }
    this.facadeApplicationService.setLocalStorageState()
    this.stockDataState$=this.facadeStockData.setStockDataState().subscribe()
    this.IntrinsicValueDataState$=this.facadeStockData.setIntrinsicValueDataState().subscribe()
    this.PercentPriceDifferenceDataState$=this.facadeStockData.setPercentPriceDifferenceDataState().subscribe()
  }

  ngOnDestroy(): void {
    this.IntrinsicValueDataState$?.unsubscribe();
    this.PercentPriceDifferenceDataState$?.unsubscribe()
    this.stockDataState$?.unsubscribe()
  }

}
