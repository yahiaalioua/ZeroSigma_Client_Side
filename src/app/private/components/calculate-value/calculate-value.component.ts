import { Component} from '@angular/core';
import { combineLatest, distinctUntilChanged, forkJoin, map, merge, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { ChartService } from 'src/app/private/domain/charts/chart.service';
import { StockDataHelperService } from 'src/app/core/services/utils/stock-data-helper.service';
import { FacadeStockDataService } from '../../facades/facade-stock-data.service';
import { StoreService } from 'src/app/core/state/store.service';
import { HttpFinancialModelingApiService } from '../../data-access/http-financial-modeling-api.service';
import { StockDataState } from 'src/app/core/models/application-state';


@Component({
  selector: 'app-calculate-value',
  templateUrl: './calculate-value.component.html',
  styleUrls: ['./calculate-value.component.css']
})
export class CalculateValueComponent {

  data?:Observable<any>;
  price?:Observable<number>;
  change?:Observable<number>;
  date?:Observable<Date>;
  name?:Observable<string>;
  tickr?:Observable<string>;
  constructor(
    private readonly httpData:StockDataHelperService,
    private readonly facadeStockData:FacadeStockDataService,
    private readonly chartService:ChartService,
    private readonly store:StoreService,
    private test:HttpFinancialModelingApiService
    ) { }

  chartOptions:any=this.chartService.chartOption
  chartData=this.facadeStockData.getStockDataState().pipe(map((data:StockDataState)=>data.series),distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))

  ngOnInit(): void {
    this.price=this.facadeStockData.getStockDataState().pipe(map((data:StockDataState)=>data.price),distinctUntilChanged())
    this.change=this.facadeStockData.getStockDataState().pipe(map((data:StockDataState)=>data.change),distinctUntilChanged())
    this.date=this.facadeStockData.getStockDataState().pipe(map((data:StockDataState)=>data.date),distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
    this.data=this.facadeStockData.getStockDataState()
    this.name=this.facadeStockData.getStockDataState().pipe(map((data:StockDataState)=>data.companyName),distinctUntilChanged())
    this.tickr=this.facadeStockData.getStockDataState().pipe(map((data:StockDataState)=>data.ticker),distinctUntilChanged())

  }
  click(){
    /* this.facadeStockData.setStockDataState().subscribe()
    this.store.applicationState$.subscribe(console.log)
    this.test.mergedStockCompanyData('meta').pipe(map(
      (val:any)=>val[0]
    )).subscribe(console.log) */
  }
}
