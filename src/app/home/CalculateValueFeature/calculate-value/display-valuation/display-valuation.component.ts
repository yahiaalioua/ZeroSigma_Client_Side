import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HttpGetCallsService } from 'src/app/core/services/HttpAndInterceptors/http-get-calls.service';
import { DataHelperService } from 'src/app/core/services/HttpAndInterceptors/Utils/data-helper.service';

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
  constructor(private readonly httpData:DataHelperService) { }

  ngOnInit(): void {
    this.price=this.httpData.stockData$.pipe(map(data=>data.close));
    this.change=this.httpData.stockData$.pipe(map(data=>data.change));
    this.date=this.httpData.stockData$.pipe(map(data=>data.date));
    this.data=this.httpData.stockData$
    this.name=this.httpData.companyInfo$.pipe(map(data=>data.name))
    this.tickr=this.httpData.companyInfo$.pipe(map(data=>data.symbol))
  }
  click(){
    this.httpData.companyInfo$.pipe(tap(val=>console.log(val))).subscribe()
  }

}
