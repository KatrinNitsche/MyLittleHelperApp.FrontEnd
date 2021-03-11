import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  baseUrlSettings: string = "https://localhost:44349/";
  baseUrl: string = "https://quotes.stormconsultancy.co.uk/random.json/";
  endPoint: string = "random.json";
  endPointSettings: string = "settings";

  constructor(private http: HttpClient) {   
  }

  getQuote(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + this.endPoint).pipe(
      tap(),
      catchError(err => this.handleError(err))
    );
  }

  LoadSettings(): Observable<Settings> {
    return this.http.get<Settings>(this.baseUrlSettings + this.endPointSettings).pipe(
      tap(),
      catchError(err => this.handleError(err))
    );
  }

  SaveSettings(settings: Settings): Observable<Settings> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(settings);
    
    return this.http.post<Settings>(this.baseUrlSettings + this.endPointSettings, body, {'headers': headers});
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
