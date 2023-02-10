import { Injectable } from '@angular/core';
import { map, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchFeatureService {

  constructor() { }
  doSearch(char:string,data:any[]){
    return of(data).pipe(
      map(val=>
        val.filter(
          item=>item.toLowerCase().indexOf(char.toLowerCase())!==-1
        ))
    )
  };
  CompaniesSubj$:Subject<string[]>= new Subject();
  Companies$:Observable<string[]>=this.CompaniesSubj$.asObservable();

  /*
  Get data from Search field
  1 bing input field using form control
  2 When click is triggered get value from form control and emit the value to api
  */
}
