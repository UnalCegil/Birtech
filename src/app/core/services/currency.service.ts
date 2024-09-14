import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/2a505f0635d1386702019f50/latest/USD'

  constructor(private http: HttpClient) { }

  getRates(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
      })
    );
  }
}
