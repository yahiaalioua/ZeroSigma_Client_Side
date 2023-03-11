import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter,Observable,Subject, switchMap, tap } from 'rxjs';
import { Top50Companies } from 'src/app/private/data-access/stock-listed-companies';
import { HttpStockData } from 'src/app/core/services/http/http-external/http-stock-data';
import { SearchFeatureService } from 'src/app/core/services/search-feature.service';

@Component({
  selector: 'app-search-smart',
  templateUrl: './search-smart.component.html',
  styleUrls: ['./search-smart.component.css']
})
export class SearchSmartComponent implements OnInit {

  AllCompanies=Top50Companies;
  constructor(private searchSer:SearchFeatureService,private StockDataService:HttpStockData) { }

  CompaniesSubj$:Subject<string[]>=this.searchSer.CompaniesSubj$
  Companies$:Observable<string[]>=this.searchSer.Companies$
  searchInput=new FormControl();
  @ViewChild('UserSearch') UserSearch!:ElementRef|undefined
  ngOnInit(): void {
    this.searchInput.valueChanges.pipe(
      filter(char=>!char||char?.length>0),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(char=>this.searchSer.doSearch(char,this.AllCompanies))
    ).subscribe(val=>this.CompaniesSubj$.next(val))
  }
  SendInputData(inputData:string){
    this.StockDataService.UserSearchData.next(inputData);
  }
  SendClickedData(data:string){
    this.StockDataService.UserSearchData.next(data)
  }

}
