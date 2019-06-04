import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sourceUrl, menuItems, currentTypeData } from '../../assets/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
    this.base = sourceUrl;
  }
  private title: string;
  private base: string;
  private responseCache = new Map();
  public items: [];
  public link;
  public linkFind: {};

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'ardname-tasks'
    })
  };

  private getUrl(url: string = ''): string {
    return this.base + url;
  }

  public getItems(
    id: number,
    title: string = currentTypeData,
    separator: string = '/?id='
  ) {
    this.title = _.find(menuItems, { name: title }).data;
    if (id) {
      this.title = `${this.title}${separator}${id}`;
    }
    return this.getDataHttp(this.title);
  }

  // Caching for HTTP requests
  private getDataHttp(url: string): Observable<any> {
    const dataCache = this.responseCache.get(this.getUrl(url));
    if (dataCache) {
      return of(dataCache);
    }
    const response = this.http.get<[]>(this.getUrl(url), this.httpOptions);
    response.subscribe(data => this.responseCache.set(this.getUrl(url), data));
    return response;
  }
}
