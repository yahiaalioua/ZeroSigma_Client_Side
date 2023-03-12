import { Component} from '@angular/core';
import { combineLatest, forkJoin, map, merge, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { ChartService } from 'src/app/private/domain/charts/chart.service';
import { StockDataHelperService } from 'src/app/core/services/utils/stock-data-helper.service';
import { FacadeStockDataService } from '../../facades/facade-stock-data.service';
import { StoreService } from 'src/app/core/state/store.service';
import { HttpFinancialModelingApiService } from '../../data-access/http-financial-modeling-api.service';


@Component({
  selector: 'app-calculate-value',
  templateUrl: './calculate-value.component.html',
  styleUrls: ['./calculate-value.component.css']
})
export class CalculateValueComponent {

  data?:Observable<any>;
  price?:Observable<string>;
  change?:Observable<string>;
  date?:Observable<string>;
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
  chartData=this.facadeStockData.UserSearchData$.pipe(
    switchMap(data=>this.facadeStockData.stockData(data)))

  ngOnInit(): void {
    this.price=this.httpData.stockData$.pipe(map(data=>data.close));
    this.change=this.httpData.stockData$.pipe(map(data=>data.change));
    this.date=this.httpData.stockData$.pipe(map(data=>data.date));
    this.data=this.httpData.stockData$.pipe();
    this.name=this.httpData.companyInfo$.pipe(map(data=>data.name))
    this.tickr=this.httpData.companyInfo$.pipe(map(data=>data.symbol))

  }
  click(){
    /* this.facadeStockData.setStockDataState().subscribe()
    this.store.applicationState$.subscribe(console.log)
    this.test.mergedStockCompanyData('meta').pipe(map(
      (val:any)=>val[0]
    )).subscribe(console.log) */
  }
}
