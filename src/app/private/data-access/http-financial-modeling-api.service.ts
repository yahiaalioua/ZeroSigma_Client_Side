import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, combineLatest, forkJoin, map, Observable, shareReplay, switchMap, zip} from 'rxjs';
import { StockDataHelperService } from 'src/app/core/services/utils/stock-data-helper.service';
import { StoreService } from 'src/app/core/state/store.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { SearchCompany } from '../models/search-company';
import { StockData } from '../models/stock-data-series';

@Injectable({
  providedIn: 'root'
})
export class HttpFinancialModelingApiService {

  constructor(
    private readonly http:HttpClient,
    private readonly toast:ToastService,
    private readonly stockDataHelper:StockDataHelperService,
    private readonly datePipe:DatePipe,
    private readonly store:StoreService
  ) { }

  apiKey:string='9e79e541240a16005f1940b4b6984242'
  searchCompaanyUrl:string='https://financialmodelingprep.com/api/v3/search'
  stockHisoricalDataUrl:string='https://financialmodelingprep.com/api/v3/historical-price-full/'

  searchCompany(ticker:string):Observable<SearchCompany>{
    return this.http.get<SearchCompany>(`${this.searchCompaanyUrl}?query=${ticker}&limit=10&exchange=NASDAQ&apikey=${this.apiKey}`)
  }
  historicalStockData(ticker:string):Observable<StockData>{
    return this.http.get<StockData>(`${this.stockHisoricalDataUrl}${ticker}?apikey=${this.apiKey}`)
  }
  searchCompany$(ticker:string): Observable<any>{
    return this.searchCompany(ticker).pipe(shareReplay({refCount: true }), map(
      (data:any)=> {
       const Ticker=data[0].symbol
       const Name=data[0].name
       if(Ticker!=undefined||null){
        this.stockDataHelper.lastTikerData.next({ticker:Ticker})
        this.stockDataHelper.companyInfo.next(data[0])
        this.store.setState({...this.store.getApplicationState(),StockData:{...this.store.getApplicationState().StockData,ticker:Ticker,companyName:Name}})
        return {ticker:Ticker,companyName:Name}
       }
       else return})
       ,catchError((err:any)=>{
          this.toast.SetToast({Title:'Error',Message:'Company not found.(make sure to type the correct ticker)',Type:'Error',Show:true});
          this.toast.DismissToast();
          return this.stockDataHelper.lastTikerData$
        }
      )
    )
  }

  stockData$(ticker:string):Observable<StockData[]>{
    return this.searchCompany$(ticker).pipe(switchMap((data:any)=>this.http.get<StockData>
      (`https://financialmodelingprep.com/api/v3/historical-price-full/${data.ticker}?apikey=${this.apiKey}`).pipe(shareReplay({refCount: true }),
      map((data:any)=>data.historical.slice(0,30).map((val:any)=>{
        let date=this.datePipe.transform(val.date,'longDate')
        let stockData:StockData={y:val.close, x:date,change:val.change}
        this.stockDataHelper.stockData.next(data.historical[0])
        return stockData
      })
    ))))
  };

  mergedStockCompanyData(ticker:string){
    return forkJoin([this.stockData$(ticker),this.searchCompany$(ticker)]).pipe(
      map((arr1,arr2)=>arr1)
    )
  }
}
