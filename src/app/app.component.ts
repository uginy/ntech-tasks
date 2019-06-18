import { Component, OnInit } from '@angular/core';
import { filter } from 'lodash';
import { menuItems, currentTypeData } from 'src/assets/config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  public message: string;
  public homeUrl: string = currentTypeData;
  public menus: {};

  constructor() { }

  ngOnInit() {

    this.initLoad();
  }

  private initLoad() {
    this.menus = filter(menuItems, { active: true });
  }
}
