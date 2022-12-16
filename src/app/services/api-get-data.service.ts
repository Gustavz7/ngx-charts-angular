import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, Subject } from 'rxjs';
import { throwError as observableThrowError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiGetDataService {
  constructor(private http: HttpClient) {}

  urlBase: string = 'https://mindicador.cl/api';
  private mensaje = new BehaviorSubject("");
  currentCurrency = this.mensaje.asObservable();

  setCurrency(msg: string) {
    this.mensaje.next(msg);
  }

  getAllCurrencies(): Observable<any>{
    return this.http.get(this.urlBase).pipe(catchError(this.errorHandler));
  }

  getData(value: string): Observable<any> {
    return this.http
      .get(`${this.urlBase}/${value}`)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message);
  }
}
