import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHelperService {
  public lastTikerData:BehaviorSubject<object>=new BehaviorSubject<object>({Ticker:'meta'});
  public lastTikerData$:Observable<object>=this.lastTikerData.asObservable();
  public stockData:BehaviorSubject<any>=new BehaviorSubject<any>(null);
  public stockData$:Observable<any>=this.stockData.asObservable();
  public companyInfo:BehaviorSubject<any>=new BehaviorSubject<any>(null);
  public companyInfo$:Observable<any>=this.companyInfo.asObservable();

  constructor() { }
}
