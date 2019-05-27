import { Component, OnInit } from '@angular/core';
import {AppdataService} from "../services/appdata.service";
import * as config from '../../assets/config';
import {Router} from "@angular/router";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private menuItems: any[] =config.menuItems;


  constructor(private appData:AppdataService, private router: Router) { }

  ngOnInit() {
  }

  onMenu(item) {
    this.menuItems.forEach((menu)=> {
        menu['active'] = false;
        if (menu.name === item.name) {
          menu['active'] = true;
        }
      }
    )
    this.appData.selectData(item.data);
    this.router.navigateByUrl('');
  }





}
