
import { Component, Input, OnInit} from "@angular/core";
import { ActivatedRoute} from "@angular/router";

import { map} from "rxjs";

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.css']
})
export class StockGraphComponent implements OnInit {
  companyName:string=''
  chartOptions:any;


  @Input()getChartOptions:any
  @Input()resolverData:any

  ngOnInit(): void {
    this.resolverData.pipe(map((data:any)=>{
      this.chartOptions=this.getChartOptions(data)
    })).subscribe();

  }
}
