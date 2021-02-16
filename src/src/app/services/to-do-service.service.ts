import { Injectable, Inject } from "@angular/core";
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

  constructor(private http: HttpClient) { }

  getToDos(): Observable<ToDo[]> {   
    return this.http.get<ToDo[]>(this.baseUrl + this.endPoint).pipe(
      tap(data => console.log('ToDos: ' + JSON.stringify(data))),
      catchError(err => this.handleError(err))
    );
  }

  addToDo(toDo:ToDo): Observable<ToDo> {
    const headers = {   
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',       
        'content-type': 'application/json', 
        'Access-Control-Allow-Origin': 'https://localhost'}  
    const body = JSON.stringify(toDo);

    return this.http.post<ToDo>(this.baseUrl + this.endPoint, body, {'headers': headers});
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
