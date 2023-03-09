import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserFacadeService } from 'src/app/core/facades/user-facade.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private userFacade:UserFacadeService) { }
  @Input()fullName$:Observable<string|undefined>|undefined;
  
  ngOnInit(): void {
    this.fullName$=this.userFacade.userCredentials$.pipe(map(credential=>credential.fullName));
  }

}
