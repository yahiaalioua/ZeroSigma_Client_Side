
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import { map} from "rxjs";

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockGraphComponent implements OnChanges {
  chartOptions:any;

  @Input()getChartOptions:any
  @Input()chartData:any

  ngOnChanges(changes: SimpleChanges): void {
    this.chartData.pipe(map((data:any)=>{
      this.chartOptions=this.getChartOptions(data)
    })).subscribe();
  }
}
