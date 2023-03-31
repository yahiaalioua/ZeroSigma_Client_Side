import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockDataHelperService {
  public lastTikerData:BehaviorSubject<string>=new BehaviorSubject<string>('meta');
  public lastTikerData$:Observable<string>=this.lastTikerData.asObservable();
  constructor() { }
}
