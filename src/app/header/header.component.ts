import { Component, OnInit } from '@angular/core';
import {AppdataService} from "../services/appdata.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentTitle:any;
  currentView:boolean=true;
  constructor(private appData:AppdataService, private router: Router) { }

  ngOnInit() {
    this.appData.selectedTypeData.subscribe(data=>this.currentTitle=data);

  }


}
