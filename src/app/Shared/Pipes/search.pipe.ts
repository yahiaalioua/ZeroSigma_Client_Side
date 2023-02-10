import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(companies: string[], searchInput: any): any[]{
    if(!searchInput) {
        return  [];
    }

   searchInput = searchInput.toLowerCase();
   return companies.filter(
       x =>x.toLowerCase().includes(searchInput)
   )
 }

}
