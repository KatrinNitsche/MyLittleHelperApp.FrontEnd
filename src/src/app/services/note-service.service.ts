import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  baseUrl: string = "https://localhost:44349/";
  endPoint: string = "note";

  constructor(private http: HttpClient) {   
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl + this.endPoint).pipe(
      tap(),
      catchError(err => this.handleError(err))
    );
  }

  addNote(note: Note): Observable<Note> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(note);
    
    return this.http.post<Note>(this.baseUrl + this.endPoint, body, {'headers': headers});

  }

  updateNote(note: Note): Observable<Note> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(note);

    return this.http.post<Note>(this.baseUrl + this.endPoint, body, {'headers': headers});

  }

  removeNote(id: number):Observable<Note> {
    const headers = { 'content-type': 'application/json' }  
    const body = JSON.stringify(id);
    
    const options = {
      headers: headers
    };

    return this.http.delete<Note>(this.baseUrl + this.endPoint + "?id=" + id, options);
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
