import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { ToDo } from "../models/Todo";

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  baseUrl: string = "https://localhost:44349/";
  endPoint: string = "todo";

  constructor(private http: HttpClient) {   
   }

  getToDos(today: boolean, categoryId: number): Observable<ToDo[]> {   
    return this.http.get<ToDo[]>(this.baseUrl + this.endPoint + "?categoryId" + categoryId + "&todaysToDos=" + today).pipe(
      tap(),
      catchError(err => this.handleError(err))
    );
  }

  addToDo(toDo:ToDo): Observable<ToDo> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(toDo);
    
    return this.http.post<ToDo>(this.baseUrl + this.endPoint, body, {'headers': headers});
  }

  updateToDo(toDo:ToDo):Observable<ToDo> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(toDo);

    return this.http.post<ToDo>(this.baseUrl + this.endPoint, body, {'headers': headers});
  }

  removeToDo(id:number):Observable<ToDo> {
    const headers = { 'content-type': 'application/json' }  
    const body = JSON.stringify(id);
    
    const options = {
      headers: headers
    };

    return this.http.delete<ToDo>(this.baseUrl + this.endPoint + "?id=" + id, options);
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
