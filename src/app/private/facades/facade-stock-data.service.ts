import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StockDataHelperService } from 'src/app/core/services/utils/stock-data-helper.service';
import { HttpFinancialModelingApiService } from '../data-access/http-financial-modeling-api.service';
import { ApplicationStateService } from '../domain/services/application-state.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeStockDataService {

  constructor(
    private readonly stockDataHelper:StockDataHelperService,
    private readonly httpFinancialModelingApi:HttpFinancialModelingApiService,
    private readonly applicationStateService:ApplicationStateService
  ) { }

  public lastTikerdata=this.stockDataHelper.lastTikerData
  public lastTikerData$:Observable<string>=this.stockDataHelper.lastTikerData$

  searchCompany(ticker:string){
    return this.httpFinancialModelingApi.searchCompany$(ticker)
  }
  stockData(ticker:string){
    return this.httpFinancialModelingApi.stockData$(ticker)
  }
  setStockDataState(){
    return this.applicationStateService.setStockDataState()
  }
  getStockDataState(){
    return this.applicationStateService.getStockDataState()
  }
  setIntrinsicValueDataState(){
    return this.applicationStateService.setIntrinsicValueDataState()
  }
  setPercentPriceDifferenceDataState(){
    return this.applicationStateService.setPercentageDifferenceDataState()
  }
  getValuationDataState(){
    return this.applicationStateService.getValuationDataState()
  }
}
