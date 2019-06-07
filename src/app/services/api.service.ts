import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { sourceUrl } from '../../assets/config';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
    this.base = sourceUrl;
  }
  private base: string;
  // private responseCache = new Map();

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'ardname-tasks'
    })
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  private getUrl(url: string = ''): string {
    return this.base + url;
  }

  public getDataHttp(url: string): Observable<any> {
    // Call the http GET
    return this.http.get(this.getUrl(url), this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  // Caching for HTTP requests
  // public getDataHttp(url: string): Observable<any> {
  //   const dataCache = this.responseCache.get(this.getUrl(url));
  //   if (dataCache) {
  //     return of(dataCache);
  //   }
  //   const response = this.http.get<[]>(this.getUrl(url), this.httpOptions);
  //   response.subscribe(data => this.responseCache.set(this.getUrl(url), data));
  //   return response;
  // }
}
