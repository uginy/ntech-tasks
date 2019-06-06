import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { find } from 'lodash';
import { menuItems, currentTypeData } from 'src/assets/config';
@Injectable()
export class MessageService {
  private startTitle = find(menuItems, { data: currentTypeData }).title;
  private messageSource = new BehaviorSubject(this.startTitle);
  currentMessage = this.messageSource.asObservable();

  constructor() {}

  public changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
