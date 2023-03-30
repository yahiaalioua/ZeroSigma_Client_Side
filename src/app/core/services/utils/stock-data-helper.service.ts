import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockDataHelperService {
  UserSearchData:BehaviorSubject<string>=new BehaviorSubject<string>('Meta');
  UserSearchData$:Observable<string>=this.UserSearchData.asObservable();
  public lastTikerData:BehaviorSubject<string>=new BehaviorSubject<string>('meta');
  public lastTikerData$:Observable<string>=this.lastTikerData.asObservable();
  UserSearchData1:BehaviorSubject<string>=new BehaviorSubject<string>('Meta');
  UserSearchData$1:Observable<string>=this.UserSearchData.asObservable();

  constructor() { }
}
