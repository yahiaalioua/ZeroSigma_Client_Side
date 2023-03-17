import { ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { Observable} from 'rxjs';
import { StockDataState } from 'src/app/core/models/application-state';


@Component({
  selector: 'app-display-valuation',
  templateUrl: './display-valuation.component.html',
  styleUrls: ['./display-valuation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayValuationComponent {
  @Input()data?:Observable<StockDataState>;
  @Input()price?:Observable<number>;
  @Input()change?:Observable<number>;
  @Input()date?:Observable<Date>;
  @Input()name?:Observable<string>;
  @Input()tickr?:Observable<string>;
  @Input()intrinsicValue?:Observable<number>
  @Input()chartOptions:any;
  @Input()chartData:any;


}

