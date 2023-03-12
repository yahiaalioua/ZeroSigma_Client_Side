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
}
