import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sourceUrl, itemsPerPage } from '../../assets/config';

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
  private base: string;
  public responseCache = new Map();
  public items;
  private query;
  constructor(private http: HttpClient) {
    this.base = sourceUrl;
  }

  private getUrl(url: string = ''): string {
    return this.base + url;
  }

  public getUser(id) {
    if (!id) {
      return;
    }
    this.getDataHttp(`users/${id}`).subscribe(
      data => {
        return data;
      },
      err => {
        console.log(err);
      }
    );
  }

  public getItems(id: number, title: string) {
    if (!id) {
      this.query = title;
    } else {
      this.query = `${title}/?id=${id}`;
    }

    this.getDataHttp(this.query).subscribe(
      data => {
        this.items = data;
      },
      err => {
        console.log(err);
      }
    );
    return this.items;
  }

  // Caching for HTTP requests
  public getDataHttp(url: string): Observable<any> {
    const dataCache = this.responseCache.get(this.getUrl(url));
    if (dataCache) {
      return of(dataCache);
    }
    const response = this.http.get<any>(this.getUrl(url), httpOptions);
    response.subscribe(data => this.responseCache.set(this.getUrl(url), data));
    return response;
  }
}
