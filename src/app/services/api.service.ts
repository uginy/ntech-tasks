import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import { map } from 'rxjs/operators';
import * as config from '../../assets/config'
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  getData(data){
    return this.http.get(config.sourceUrl + data)
      .pipe(map(response => {
        const data = response;
        return data;
      }))

  }
  getDataById(data,id){
    return this.http.get(config.sourceUrl + data+'/'+id)
      .pipe(map(response => {
        const data = response;
        return data;
      }))

  }
}
