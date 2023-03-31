import { Injectable } from '@angular/core';
import {Resolve,RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';
import { catchError,Observable, of, switchMap } from 'rxjs';
import { HttpErrorHandlerService } from '../errors/http-error-handler.service';
import { StockData } from '../../private/models/stock-data-series';
import { FacadeStockDataService } from 'src/app/private/facades/facade-stock-data.service';

@Injectable({
  providedIn: 'root'
})
export class StockDataResolver implements Resolve<StockData|unknown> {

  constructor(private readonly facadeStockData:FacadeStockDataService,private httpErrorHandler:HttpErrorHandlerService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StockData|unknown> {
    return this.facadeStockData.lastTikerData$.pipe(
      switchMap(data=>this.facadeStockData.stockData(data)),
      catchError(err=>{
        this.httpErrorHandler.HandleResolverError('We apoligize, but our stock data and company valuation is currently unavailable')
        return of(null)
      })
  )}
}
