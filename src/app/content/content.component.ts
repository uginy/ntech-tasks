import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import {AppdataService} from "../services/appdata.service";
import * as config from '../../assets/config'
import {Router} from "@angular/router";
import * as config from '../../assets/config';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  private dataKind = config.currentTypeData;
  private numberPages = 20;
  private currentData:any[];
  private pagination:number[] = [];
  public selectedPage:number = 1;

  constructor(private apiServise:ApiService, private appData:AppdataService, private router:Router) {
  }

  ngOnInit() {
    this.onGet(this.dataKind);
  }

  onGet(data) {
    this.appData.currentData.subscribe(data => {
      if (this.dataKind != data) {
        this.selectedPage = 1;
      }
      this.dataKind = data;
      this.apiServise.getData(data).subscribe(
        (service:any[])=> {
          let pageIndex = (this.selectedPage - 1) * config.itemsPerPage;
          this.pagination = this.pageNubers(service.length);
          this.currentData = service.slice(pageIndex, pageIndex + config.itemsPerPage);

        })
    })

  }

  changePage(newPage:number) {

    if (newPage >= this.numberPages - 2 && this.currentData.length > this.numberPages) {

    }
    this.selectedPage = newPage;
    this.onGet(this.dataKind);
  }

  pageNubers(length):number[] {

    if (length >= this.numberPages && this.selectedPage >= this.numberPages - 2) {

      if (this.selectedPage < this.numberPages) {
        return Array(Math.ceil(length / config.itemsPerPage)).fill(2).map((x, i)=>i + x);
      } else {
        return Array(Math.ceil(length / config.itemsPerPage)).fill(Math.abs(this.selectedPage + 2 - this.numberPages)).map((x, i)=>i + x);
      }

    } else {
      return Array(Math.ceil(length / config.itemsPerPage)).fill(1).map((x, i)=>i + x);
    }

  }

  onDetails(id:string) {
    this.router.navigate(['/' + this.dataKind + '/' + id, {id: id, data: this.dataKind}]);
  }


}
