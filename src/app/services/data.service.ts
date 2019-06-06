import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MessageService } from './message.service';

import { menuItems, currentTypeData } from '../../assets/config';
import { find } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private title: string;
  public items: [];
  public linkFind: {};

  constructor(
    private api: ApiService,
    private messageService: MessageService
  ) {}

  public dataLoad(
    id: number,
    title: string = currentTypeData,
    searchParam: string = '/?id='
  ) {
    this.messageService.changeMessage(title);
    this.title = find(menuItems, { name: title }).data;
    if (id) {
      this.title = `${this.title}${searchParam}${id}`;
    }
    return this.api.getDataHttp(this.title);
  }
}
