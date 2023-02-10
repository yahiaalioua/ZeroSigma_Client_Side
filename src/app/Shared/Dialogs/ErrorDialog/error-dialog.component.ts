import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomErrorHandlerService } from 'src/app/core/Errors/custom-error-handler.service';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  constructor(private readonly errorService:CustomErrorHandlerService) { }
  message:Observable<string> | undefined
  ngOnInit(): void {
    this.message=this.errorService.errorMessage$
  }
  close(){

  }


}
