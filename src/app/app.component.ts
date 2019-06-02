import { Component, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';
import * as _ from 'lodash';
import { menuItems, currentTypeData } from 'src/assets/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public message: string;
  public logoUrl;
  public menus: {};
  constructor(private messageService: MessageService) {}
  ngOnInit() {
    this.logoUrl = currentTypeData;
    this.menus = _.filter(menuItems, { active: true });
    this.messageService.currentMessage.subscribe(
      message => (this.message = message)
    );
  }
}
