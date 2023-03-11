import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, combineLatest, forkJoin, mergeMap, Observable, of, switchMap } from 'rxjs';
import { ToastService } from 'src/app/Shared/services/toast.service';
import { HttpErrorHandlerService } from '../errors/http-error-handler.service';
import { HttpStockData } from '../services/http/http-external/http-stock-data';
import { StockData } from '../../private/models/stock-data-series';

@Injectable({
  providedIn: 'root'
})
export class StockDataResolver implements Resolve<StockData|unknown> {

  constructor(private readonly httpData:HttpStockData,private httpErrorHandler:HttpErrorHandlerService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StockData|unknown> {
    return this.httpData.UserSearchData$.pipe(
      switchMap(data=>this.httpData.StockData$(data)),
      catchError(err=>{
        this.httpErrorHandler.HandleResolverError('We apoligize, but our stock data and company valuation is currently unavailable')
        return of(null)
      })
  )}
}
