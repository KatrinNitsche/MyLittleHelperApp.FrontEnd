import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MealPlanDay } from '../models/mealPlanDay';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {

  baseUrl: string = "https://localhost:44349/";
  endPoint: string = "mealplan";

  constructor(private http: HttpClient) {}

  getPlan(): Observable<MealPlanDay[]> {
    return this.http.get<MealPlanDay[]>(this.baseUrl + this.endPoint).pipe(
      tap(),
      catchError(err => this.handleError(err))
    );
  }

  updatePlan(mealPlanDay: MealPlanDay): Observable<MealPlanDay> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(mealPlanDay);

    return this.http.post<MealPlanDay>(this.baseUrl + this.endPoint, body, {'headers': headers});
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
