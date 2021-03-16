import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Category } from '../models/category';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  baseUrlSettings: string = "https://localhost:44349/";
  baseUrl: string = "https://quotes.stormconsultancy.co.uk/random.json/";
  endPoint: string = "random.json";
  endPointSettings: string = "settings";
  endpointCategories: string = "category";

  constructor(private http: HttpClient) {   
  }

  getQuote(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + this.endPoint).pipe(
      tap(),
      catchError(err => this.handleError(err))
    );
  }

  LoadCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrlSettings + this.endpointCategories).pipe(
      tap(),
      catchError(err => this.handleError(err))
    );
  }

  AddCategory(category: Category): Observable<Category> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(category);
    
    return this.http.post<Category>(this.baseUrlSettings + this.endpointCategories, body, {'headers': headers});
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
