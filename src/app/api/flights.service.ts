import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(public http: HttpClient) { }

  serverUrl = environment.serverUrl;

  getFlights(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverUrl}/flights/2`).pipe(
      tap((data) => {
        // console.log('ALL ' + JSON.stringify(data))
      }),
      catchError(this.handleError)
    );
  }

  // Capture error Http
  private handleError(err: HttpErrorResponse) {
    const error = {
      status: err.status,
      message: err.message,
    };
    return throwError(error);
  }
}
