import { Component, OnInit } from '@angular/core';
import { SimpledataService } from './services/simpledata.service';
import * as _ from 'lodash';
import { menuItems, currentTypeData } from 'src/assets/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private message: string;
  private logoUrl;
  private menus: {};
  constructor(private simpledataService: SimpledataService) {}
  ngOnInit() {
    this.logoUrl = currentTypeData;
    this.menus = _.filter(menuItems, { active: true });
    this.simpledataService.currentMessage.subscribe(
      message => (this.message = message)
    );
  }
}
