
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
import { map, Subscription} from "rxjs";

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockGraphComponent implements OnChanges,OnDestroy {
  chartOptions:any;
  subscription$?:Subscription
  @Input()getChartOptions:any
  @Input()chartData:any

  ngOnChanges(changes: SimpleChanges): void {
    this.subscription$=this.chartData.pipe(map((data:any)=>{
      this.chartOptions=this.getChartOptions(data)
    })).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe()
  }
}
