import { Component, OnDestroy} from '@angular/core';
import { distinctUntilChanged,map, Observable,} from 'rxjs';
import { ChartService } from 'src/app/private/domain/charts/chart.service';
import { FacadeStockDataService } from '../../facades/facade-stock-data.service';
import { StockDataState, Valuation } from 'src/app/core/models/application-state';
import { FinancialDataModelingService } from '../../domain/services/financial-data-modeling.service';


@Component({
  selector: 'app-calculate-value',
  templateUrl: './calculate-value.component.html',
  styleUrls: ['./calculate-value.component.css']
})
export class CalculateValueComponent{

  data?:Observable<any>;
  price?:Observable<number>;
  change?:Observable<number>;
  date?:Observable<Date>;
  name?:Observable<string>;
  tickr?:Observable<string>;
  intrinsicValue?:Observable<number>;
  diffFromCurrentPrice?:Observable<number>;
  constructor(
    private readonly facadeStockData:FacadeStockDataService,
    private readonly chartService:ChartService,
    private readonly financialDatamodeling:FinancialDataModelingService
    ) { }

  chartOptions:any=this.chartService.chartOption
  chartData=this.facadeStockData.getStockDataState().pipe(map((data:StockDataState)=>data.series),distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))

  ngOnInit(): void {
    this.price=this.facadeStockData.getStockDataState().pipe(map((data:StockDataState)=>data.price),distinctUntilChanged())
    this.change=this.facadeStockData.getStockDataState().pipe(map((data:StockDataState)=>data.change),distinctUntilChanged())
    this.date=this.facadeStockData.getStockDataState().pipe(map((data:StockDataState)=>data.date),distinctUntilChanged())
    this.data=this.facadeStockData.getStockDataState().pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
    this.name=this.facadeStockData.getStockDataState().pipe(map((data:StockDataState)=>data.companyName),distinctUntilChanged())
    this.tickr=this.facadeStockData.getStockDataState().pipe(map((data:StockDataState)=>data.ticker),distinctUntilChanged())
    this.intrinsicValue=this.facadeStockData.getValuationDataState().pipe(map((data:Valuation)=>data.intrinsicValue),distinctUntilChanged())
    this.diffFromCurrentPrice=this.facadeStockData.getValuationDataState().pipe(map((data:Valuation)=>data.percentageDifference),distinctUntilChanged())
  }


}
