import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService implements ErrorHandler{

  constructor(private snackbar:MatSnackBar) { }
  private errorMessage:Subject<string>=new Subject();
  errorMessage$:Observable<string>=this.errorMessage.asObservable();
  handleError(error: unknown): void {
     let message:string='An Error has just happened, we are already working on it. Sorry for the inconvenience';
     this.snackbar.open(
      message,
      'Close',
      {duration:2000}
     );
     console.error('Error caught from Custom Error handler', error)
  }
}
