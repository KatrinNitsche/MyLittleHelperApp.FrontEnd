import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BudgetEntry } from '../models/budgetEntry';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  baseUrl: string = "https://localhost:44349/";
  endPoint: string = "budget";

  constructor(private http: HttpClient) { }

  getBudget(thisMonth: boolean): Observable<BudgetEntry[]> {

    if (thisMonth == true) {
      return this.http.get<BudgetEntry[]>(this.baseUrl + this.endPoint + "?thisMonth=true").pipe(
        tap(),
        catchError(err => this.handleError(err))
      );
    } else {
      return this.http.get<BudgetEntry[]>(this.baseUrl + this.endPoint).pipe(
        tap(),
        catchError(err => this.handleError(err))
      );
    }
  }

  addBudget(budgetEntry: BudgetEntry): Observable<BudgetEntry> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(budgetEntry);

    return this.http.post<BudgetEntry>(this.baseUrl + this.endPoint, body, { 'headers': headers });
  }

  updateBudget(budgetEntry: BudgetEntry): Observable<BudgetEntry> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(budgetEntry);

    return this.http.post<BudgetEntry>(this.baseUrl + this.endPoint, body, { 'headers': headers });

  }

  removeBudget(id: number): Observable<BudgetEntry> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(id);

    const options = {
      headers: headers
    };

    return this.http.delete<BudgetEntry>(this.baseUrl + this.endPoint + "?id=" + id, options);
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
