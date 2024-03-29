import { Injectable } from '@angular/core';
import { map, switchMap, tap} from 'rxjs';
import { ApplicationState } from 'src/app/core/models/application-state';
import { StockDataHelperService } from 'src/app/core/services/utils/stock-data-helper.service';
import { userInfoResponse } from 'src/app/private/models/user-responses';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { localStorageState } from '../../../core/models/local-storage-state';
import { StoreService } from '../../../core/state/store.service';
import { HttpDatabaseService } from '../../data-access/http-database.service';
import { HttpFinancialModelingApiService } from '../../data-access/http-financial-modeling-api.service';
import { FinancialDataModelingService } from './financial-data-modeling.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {

  constructor(
    private httpDatabaseService:HttpDatabaseService,
    private store:StoreService,
    private storage:LocalStorageService,
    private readonly httpFinancialModelingApi:HttpFinancialModelingApiService,
    private readonly financialDataModeling:FinancialDataModelingService,
    private readonly stockDataHelper:StockDataHelperService,
    ) { }

  setApplicationUserState$(id:number){
    return this.httpDatabaseService.getAccountInfo(id).pipe(map((UserData:userInfoResponse)=>{
        this.store.setState({...this.store.getApplicationState(),UserCredentials:{
          ...this.store.getApplicationState().UserCredentials, fullName:UserData.name,
          email:UserData.email,id:UserData.id
        },Userinfo:{
          FullName:UserData.name,Linkedin:UserData.linkedin,Youtube:UserData.youTube,
          Website:UserData.website,About_me:UserData.aboutMe
        }})
      }
    ))
  }

  setStockDataState(){
    return this.stockDataHelper.lastTikerData$.pipe(
      switchMap(data=>this.httpFinancialModelingApi.mergedStockCompanyData(data).pipe(
        map((data:any)=>this.store.setState({
          ...this.store.getApplicationState(),
          StockData:{...this.store.getApplicationState().StockData,
            series:data[0],price:data[0][0].y,date:data[0][0].x,
            change:data[0][0].change,companyName:data[1].companyName,ticker:data[1].ticker
          }})),
      )))
  }
  getStockDataState(){
    return this.store.applicationState$.pipe(map((state:ApplicationState)=>state.StockData))
  }
  setIntrinsicValueDataState(){
    return this.stockDataHelper.lastTikerData$.pipe(switchMap((ticker=>
      this.httpDatabaseService.getIntrinsicValue(ticker).pipe(map((data:any)=>
        this.store.setState({...this.store.getApplicationState(),Valuation:{
          ...this.store.getApplicationState().Valuation,intrinsicValue:data
        }})
        )))))
  }
  setPercentageDifferenceDataState(){
    return this.stockDataHelper.lastTikerData$.pipe(switchMap((ticker=>
      this.financialDataModeling.stockPricePercentageDifference(ticker).pipe(map((data:any)=>
        this.store.setState({...this.store.getApplicationState(),Valuation:{
          ...this.store.getApplicationState().Valuation,percentageDifference:data
        }})
        )))))
  }
  getValuationDataState(){
    return this.store.applicationState$.pipe(map((state:ApplicationState)=>state.Valuation))
  }
  setLocalStorageState(){
    const LocalStorageData:string=this.storage.getItem('AuthDetails')
    const LocalStorageState:localStorageState=JSON.parse(LocalStorageData);
    this.store.setLocalStorageState(LocalStorageState);
  }

}
