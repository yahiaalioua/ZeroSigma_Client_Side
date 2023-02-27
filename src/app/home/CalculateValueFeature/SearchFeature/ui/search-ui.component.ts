import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-search-ui',
  templateUrl: './search-ui.component.html',
  styleUrls: ['./search-ui.component.css']
})
export class SearchUIComponent implements OnInit {

  constructor() { }
  @Input()searchInput?:any
  @Input()Companies$?:Observable<string[]>
  @Output()InputData:EventEmitter<string>=new EventEmitter();
  @Output()ClickedData:EventEmitter<string>=new EventEmitter();
  @ViewChild("input") input!: ElementRef;
  @ViewChild("box") box!:ElementRef;
  ngOnInit(): void {
  }
  sendInputData(){
    this.InputData.emit(this.searchInput.value);
  }
  sendClickedCompanyData(data:string){
    this.ClickedData.emit(data)
    this.input.nativeElement.value=data;
    this.box.nativeElement.style.display='none'
  }

}
