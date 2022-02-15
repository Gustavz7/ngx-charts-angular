import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { throwError as observableThrowError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiGetDataService {
  urlBase: string = 'https://mindicador.cl/api';

  constructor(private http: HttpClient) {}

  getYearData(value: string): Observable<any> {
    return this.http
      .get(`${this.urlBase}/${value}`)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message);
  }
}
