
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import { map} from "rxjs";

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.css']
})
export class StockGraphComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.chartData.pipe(map((data:any)=>{
      this.chartOptions=this.getChartOptions(data)
    })).subscribe();
  }
  chartOptions:any;

  @Input()getChartOptions:any
  @Input()chartData:any
}
