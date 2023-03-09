import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { ChartService } from 'src/app/core/charts/chart.service';
import { HttpStockData } from 'src/app/core/services/http/http-external/http-stock-data';
import { DataHelperService } from 'src/app/core/services/utils/data-helper.service';

@Component({
  selector: 'app-display-valuation',
  templateUrl: './display-valuation.component.html',
  styleUrls: ['./display-valuation.component.css']
})
export class DisplayValuationComponent implements OnInit {
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
  click(){
  }

}
/*
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { ChartService } from 'src/app/core/charts/chart.service';
import { HttpGetCallsService } from 'src/app/core/services/http/http-get-calls.service';
import { DataHelperService } from 'src/app/core/services/http/Utils/data-helper.service';

@Component({
  selector: 'app-display-valuation',
  templateUrl: './display-valuation.component.html',
  styleUrls: ['./display-valuation.component.css']
})
export class DisplayValuationComponent implements OnInit {
  data?:Observable<any>;
  price?:Observable<string>;
  change?:Observable<string>;
  date?:Observable<string>;
  name?:Observable<string>;
  tickr?:Observable<string>;
  constructor(
    private readonly httpData:DataHelperService,
    private readonly chartService:ChartService,
    private activatedRoute:ActivatedRoute) { }

  chartOptions:any=this.chartService.chartOption
  resolverData=this.activatedRoute.parent?.data

  ngOnInit(): void {
    this.price=this.httpData.stockData$.pipe(map(data=>data.close));
    this.change=this.httpData.stockData$.pipe(map(data=>data.change));
    this.date=this.httpData.stockData$.pipe(map(data=>data.date));
    this.data=this.httpData.stockData$
    this.name=this.httpData.companyInfo$.pipe(map(data=>data.name))
    this.tickr=this.httpData.companyInfo$.pipe(map(data=>data.symbol))
  }
  click(){
  }

}

*/
