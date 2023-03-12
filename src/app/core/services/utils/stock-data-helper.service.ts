import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockDataHelperService {
  UserSearchData:BehaviorSubject<string>=new BehaviorSubject<string>('Meta');
  UserSearchData$:Observable<string>=this.UserSearchData.asObservable();
  public lastTikerData:BehaviorSubject<object>=new BehaviorSubject<object>({ticker:'meta'});
  public lastTikerData$:Observable<object>=this.lastTikerData.asObservable();
  public stockData:BehaviorSubject<any>=new BehaviorSubject<any>(null);
  public stockData$:Observable<any>=this.stockData.asObservable();
  public companyInfo:BehaviorSubject<any>=new BehaviorSubject<any>(null);
  public companyInfo$:Observable<any>=this.companyInfo.asObservable();

  constructor() { }
}
