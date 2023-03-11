import { HttpClient,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, mergeMap, Observable, of, OperatorFunction, shareReplay, switchMap, tap } from 'rxjs';
import { StockData } from '../../../../private/models/stock-data-series';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/Shared/services/toast.service';
import { DataHelperService } from '../../utils/data-helper.service';


@Injectable({
  providedIn: 'root'
})
export class HttpStockData {
  UserSearchData:BehaviorSubject<string>=new BehaviorSubject<string>('Meta');
  UserSearchData$:Observable<string>=this.UserSearchData.asObservable();
  ApiKey:string='9e79e541240a16005f1940b4b6984242'
  StockPriceDataApi:string='https://financialmodelingprep.com/api/v3/historical-price-full/UXIN?apikey='
  SearchCompany$(companyName:string): Observable<string|unknown>{
    return this.Http.get<any>(`https://financialmodelingprep.com/api/v3/search?query=${companyName}&limit=10&exchange=NASDAQ&apikey=`+this.ApiKey).pipe(shareReplay(), map(
      data=> {
       const symbol=data[0].symbol
       const name=data[0].name
       if(symbol!=undefined||null){
        this.utils.lastTikerData.next({Ticker:symbol})
        this.utils.companyInfo.next(data[0])
        return {Ticker:symbol,CompanyName:name}
       }
       else return
  }),catchError((err:any)=>{
    this.toast.SetToast({Title:'Error',Message:'Company not found.(make sure to type the correct ticker)',Type:'Error',Show:true});
    this.toast.DismissToast();
    return this.utils.lastTikerData$
}))};
  constructor(private Http:HttpClient,private datePipe:DatePipe,private toast:ToastService,private utils:DataHelperService) {}
  StockData$(companyName:string):Observable<StockData[]|unknown>{
    return this.SearchCompany$(companyName).pipe(switchMap((data:any)=>this.Http.get
      (`https://financialmodelingprep.com/api/v3/historical-price-full/${data.Ticker}?apikey=${this.ApiKey}`).pipe(shareReplay(),
      map((data:any)=>data.historical.slice(0,30).map((val:any)=>{
        let date=this.datePipe.transform(val.date,'longDate')
        let stockData={y:val.close, x:date,change:val.change}
        this.utils.stockData.next(data.historical[0])
        return stockData
      })
    ))))
  };
}

/* import { HttpClient,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, OperatorFunction, switchMap } from 'rxjs';
import { TikerData } from './Interfaces/stockData';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HttpGetCallsService {

  companyNameApi:string='https://financialmodelingprep.com/api/v3/search?query=UXIN&limit=10&exchange=NASDAQ&apikey='
  ApiKey:string='9e79e541240a16005f1940b4b6984242'
  StockPriceDataApi:string='https://financialmodelingprep.com/api/v3/historical-price-full/UXIN?apikey='
  constructor(private Http:HttpClient,private datePipe:DatePipe) {}
  searchCompanyByName(){
    return this.Http.get<any>(this.companyNameApi+this.ApiKey).pipe(map(
     data=> {
      const symbol=data[0].symbol
      return symbol
    }
    ), mergeMap(symbol=>this.Http.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${this.ApiKey}`).pipe(
      map((data:any)=>data.historical.slice(0,30).map((val:any)=>{
        let date=this.datePipe.transform(val.date,'longDate')
        return {y:val.close, x:date}
      }))
    )))
  }
}
 */
