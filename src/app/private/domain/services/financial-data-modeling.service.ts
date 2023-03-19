import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs';
import { map } from 'rxjs';
import { HttpDatabaseService } from '../../data-access/http-database.service';
import { HttpFinancialModelingApiService } from '../../data-access/http-financial-modeling-api.service';
import { DataTransformHelperService } from '../../utils/data-transform-helper.service';

@Injectable({
  providedIn: 'root'
})
export class FinancialDataModelingService {

  constructor(
    private readonly httpFinancialData:HttpFinancialModelingApiService,
    private readonly httpDatabase:HttpDatabaseService,
    private readonly dataTransform:DataTransformHelperService
  ) { }

  stockPrice(ticker:string){
    return this.httpFinancialData.stockData$(ticker).pipe(map(val=>val[0].y))
  }
  intrinsicValue(ticker:string){
    return this.httpDatabase.getIntrinsicValue(ticker)
  }
  stockPricePercentageDifference(ticker:string){
    return forkJoin([this.stockPrice(ticker),this.intrinsicValue(ticker)]).pipe(
      map(((arr:any)=>this.dataTransform.percentageDifference(arr[0],arr[1])))
      )
  }
}
