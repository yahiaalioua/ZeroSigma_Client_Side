import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { HttpGetCallsService } from '../services/HttpAndInterceptors/http-get-calls.service';
import { StockData } from '../services/HttpAndInterceptors/Interfaces/stockData';

@Injectable({
  providedIn: 'root'
})
export class StockDataResolver implements Resolve<StockData|unknown> {

  constructor(private readonly httpData:HttpGetCallsService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StockData|unknown> {
    return this.httpData.UserSearchData$.pipe(
      switchMap(data=>this.httpData.StockData$(data))
  )}
}
