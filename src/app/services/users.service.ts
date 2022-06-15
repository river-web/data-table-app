import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getList(): Observable<Users> {
    return this.http
      .get<Users>(this.baseUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  getDetails(id: number): Observable<Users> {
    return this.http
      .get<Users>(this.baseUrl + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
  }
}
