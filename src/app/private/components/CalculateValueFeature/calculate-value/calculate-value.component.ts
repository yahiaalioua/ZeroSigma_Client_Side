import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { ChartService } from 'src/app/private/domain/charts/chart.service';
import { HttpStockData } from 'src/app/core/services/http/http-external/http-stock-data';
import { DataHelperService } from 'src/app/core/services/utils/data-helper.service';


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
    private readonly httpData:DataHelperService,
    private readonly httpCalls:HttpStockData,
    private readonly chartService:ChartService,
    private activatedRoute:ActivatedRoute) { }

  chartOptions:any=this.chartService.chartOption
  chartData=this.httpCalls.UserSearchData$.pipe(
    switchMap(data=>this.httpCalls.StockData$(data)))

  ngOnInit(): void {
    this.price=this.httpData.stockData$.pipe(map(data=>data.close));
    this.change=this.httpData.stockData$.pipe(map(data=>data.change));
    this.date=this.httpData.stockData$.pipe(map(data=>data.date));
    this.data=this.httpData.stockData$.pipe(shareReplay())
    this.name=this.httpData.companyInfo$.pipe(map(data=>data.name))
    this.tickr=this.httpData.companyInfo$.pipe(map(data=>data.symbol))
  }
}
