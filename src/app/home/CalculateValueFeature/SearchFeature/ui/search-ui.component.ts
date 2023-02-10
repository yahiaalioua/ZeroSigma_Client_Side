import { Component, Input, OnInit } from '@angular/core';
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
  ngOnInit(): void {
  }

}
