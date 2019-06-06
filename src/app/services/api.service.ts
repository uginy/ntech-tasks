import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sourceUrl } from '../../assets/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
    this.base = sourceUrl;
  }
  private base: string;
  private responseCache = new Map();

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'ardname-tasks'
    })
  };

  private getUrl(url: string = ''): string {
    return this.base + url;
  }

  // Caching for HTTP requests
  public getDataHttp(url: string): Observable<any> {
    const dataCache = this.responseCache.get(this.getUrl(url));
    if (dataCache) {
      return of(dataCache);
    }
    const response = this.http.get<[]>(this.getUrl(url), this.httpOptions);
    response.subscribe(data => this.responseCache.set(this.getUrl(url), data));
    return response;
  }
}
