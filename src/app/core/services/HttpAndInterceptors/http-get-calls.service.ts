import { HttpClient,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, OperatorFunction, switchMap } from 'rxjs';
import { stockData } from './Interfaces/stockData';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HttpGetCallsService {

  companyNameApi:string='https://financialmodelingprep.com/api/v3/search?query=UXIN&limit=10&exchange=NASDAQ&apikey='
  ApiKey:string='9e79e541240a16005f1940b4b6984242'
  StockPriceDataApi:string='https://financialmodelingprep.com/api/v3/historical-price-full/UXIN?apikey='
  SearchCompany$(): Observable<string>{
    return this.Http.get<any>(this.companyNameApi+this.ApiKey).pipe(map(
      data=> {
       const symbol=data[0].symbol
       return symbol
  }))};
  constructor(private Http:HttpClient,private datePipe:DatePipe) {}
  StockData$():Observable<stockData[]>{
    return this.SearchCompany$().pipe(mergeMap(symbol=>this.Http.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${this.ApiKey}`).pipe(
      map((data:any)=>data.historical.slice(0,30).map((val:any)=>{
        let date=this.datePipe.transform(val.date,'longDate')
        return {y:val.close, x:date}
      })))
    ))
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
