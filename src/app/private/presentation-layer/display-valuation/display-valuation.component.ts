import { Component, Input} from '@angular/core';
import { Observable} from 'rxjs';


@Component({
  selector: 'app-display-valuation',
  templateUrl: './display-valuation.component.html',
  styleUrls: ['./display-valuation.component.css']
})
export class DisplayValuationComponent {
  @Input()data?:Observable<any>;
  @Input()price?:Observable<string>;
  @Input()change?:Observable<string>;
  @Input()date?:Observable<string>;
  @Input()name?:Observable<string>;
  @Input()tickr?:Observable<string>;
  @Input()chartOptions:any;
  @Input()chartData:any;
}

