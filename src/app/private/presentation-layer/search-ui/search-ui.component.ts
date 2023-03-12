import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-search-ui',
  templateUrl: './search-ui.component.html',
  styleUrls: ['./search-ui.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchUIComponent {


  @Input()searchInput?:any
  @Input()Companies$?:Observable<string[]>
  @Output()InputData:EventEmitter<string>=new EventEmitter();
  @Output()ClickedData:EventEmitter<string>=new EventEmitter();
  @ViewChild("input") input!: ElementRef;
  @ViewChild("box") box!:ElementRef;
  sendInputData(){
    this.InputData.emit(this.searchInput.value);
  }
  sendClickedCompanyData(data:string){
    this.ClickedData.emit(data)
    this.input.nativeElement.value=data;
    this.box.nativeElement.style.display='none'
  }

}
