import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sourceUrl } from '../../assets/config';

import { HttpClient, HttpHeaders } from '@angular/common/http';

// Set the http options
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'nayaauth'
  })
};

@Injectable({
  providedIn: 'root'
})
/**
 * Service to call all the API
 */
@Injectable()
export class ApiService {
  base: string;
  public responseCache = new Map();
  constructor(private http: HttpClient) {
    this.base = sourceUrl;
  }

  private getUrl(url: string = ''): string {
    return this.base + url;
  }

  // Cached solution
  public getDataHttp(url: string): Observable<any> {
    const dataCache = this.responseCache.get(this.getUrl(url));
    if (dataCache) {
      return of(dataCache);
    }
    console.log(dataCache);
    const response = this.http.get<any>(this.getUrl(url), httpOptions);
    response.subscribe(data => this.responseCache.set(this.getUrl(url), data));
    return response;
  }
}
