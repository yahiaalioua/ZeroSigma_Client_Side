import { Component, OnInit } from '@angular/core';
import { Observable, pluck } from 'rxjs';
import { UserFacadeService } from '../core/facades/user-facade.service';
import { HttpGetCallsService } from '../core/services/HttpAndInterceptors/http-get-calls.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpService:HttpGetCallsService) { }
  ngOnInit(): void {
  }

}
