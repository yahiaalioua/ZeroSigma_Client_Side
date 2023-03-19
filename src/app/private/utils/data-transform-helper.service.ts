import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransformHelperService {

  constructor() { }

  percentageDifference(a:number, b:number) {
    return  100 * Math.abs( ( a - b ) / ( (a+b)/2 ) );
   }
}
