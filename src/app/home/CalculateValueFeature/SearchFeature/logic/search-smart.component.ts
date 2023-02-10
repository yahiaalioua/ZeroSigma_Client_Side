import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter,Observable,Subject, switchMap } from 'rxjs';
import { Top50Companies } from 'src/app/core/Models/top200Companies';
import { SearchFeatureService } from 'src/app/core/services/search-feature.service';

@Component({
  selector: 'app-search-smart',
  templateUrl: './search-smart.component.html',
  styleUrls: ['./search-smart.component.css']
})
export class SearchSmartComponent implements OnInit {

  AllCompanies=Top50Companies;
  constructor(private searchSer:SearchFeatureService) { }
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

}
