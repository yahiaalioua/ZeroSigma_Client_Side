
import { Component, Input, OnInit} from "@angular/core";
import { map} from "rxjs";

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.css']
})
export class StockGraphComponent implements OnInit {
  chartOptions:any;

  @Input()getChartOptions:any
  @Input()chartData:any

  ngOnInit(): void {
    this.chartData.pipe(map((data:any)=>{
      this.chartOptions=this.getChartOptions(data)
    })).subscribe();
  }
}
