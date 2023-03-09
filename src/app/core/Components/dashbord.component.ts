import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { AuthResponse } from 'src/app/auth/Models/AuthModel';
import { HttpAuthServiceService } from 'src/app/auth/services/Http/http-auth-service.service';
import { ApplicationStateService } from 'src/app/state/services/application-state.service';
import { StoreService } from 'src/app/state/store.service';
import { CachedUserAuthDetails } from '../Models/cachedData';
import { StorageService } from '../services/Storage/storage.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(private readonly applicationStateService:ApplicationStateService,private readonly Storage:StorageService) { }



  ngOnInit(): void {
    let cachedAuthDetails:string=this.Storage.getItem('AuthDetails');
    if (cachedAuthDetails!=null){
    let cachedAuthDetailsObject:CachedUserAuthDetails=JSON.parse(cachedAuthDetails);
      let userId:number=cachedAuthDetailsObject.payload.id
      this.applicationStateService.SetApplicationState$(userId).subscribe();
    }
    this.applicationStateService.setLocalStorageState()
  }

}
