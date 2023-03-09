import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, combineLatest, forkJoin, mergeMap, Observable, of, switchMap } from 'rxjs';
import { ToastService } from 'src/app/Shared/services/toast.service';
import { HttpErrorHandlerService } from '../Errors/http-error-handler.service';
import { HttpGetCallsService } from '../services/http/http-get-calls.service';
import { StockData } from '../services/http/Interfaces/stockData';

@Injectable({
  providedIn: 'root'
})
export class StockDataResolver implements Resolve<StockData|unknown> {

  constructor(private readonly httpData:HttpGetCallsService,private httpErrorHandler:HttpErrorHandlerService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StockData|unknown> {
    return this.httpData.UserSearchData$.pipe(
      switchMap(data=>this.httpData.StockData$(data)),
      catchError(err=>{
        this.httpErrorHandler.HandleResolverError('We apoligize, but our stock data and company valuation is currently unavailable')
        return of(null)
      })
  )}
}
