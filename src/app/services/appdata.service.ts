import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs'
import * as config from '../../assets/config'

@Injectable({
  providedIn: 'root'
})
export class AppdataService {

  private currentTypeData:BehaviorSubject<string> = new BehaviorSubject(config.currentTypeData);
  public selectedTypeData: Observable<string>=this.currentTypeData.asObservable()

  private selectedData:BehaviorSubject<any> = new BehaviorSubject(config.currentTypeData);
  public currentData:Observable<any> = this.selectedData.asObservable();

  constructor() {
  }

  selectData(data) {
    this.selectedData.next(data);
    this.currentTypeData.next(data);
  }


}
