import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  baseUrl: string = "https://quotes.stormconsultancy.co.uk/random.json/";
  endPoint: string = "random.json";

  constructor(private http: HttpClient) {   
  }

  getQuote(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + this.endPoint).pipe(
      tap(),
      catchError(err => this.handleError(err))
    );
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }

    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
