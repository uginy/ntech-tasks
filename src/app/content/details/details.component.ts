import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import { switchMap } from 'rxjs/operators';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private details$: Observable<any>;
  public dataDetailse:any;
  public currentTypeData:string;
  public selectTypeData={users:'users', posts:'posts',albums:'albums',todos:'todos',photos:'photos'}
  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {

  this.details$ = this.route.paramMap.pipe(
  switchMap((params: ParamMap) => {
    this.currentTypeData = params.get('data');
    return this.apiService.getDataById(params.get('data'), params.get('id'))

  }
))
    this.details$.subscribe((data)=>{this.dataDetailse=data;})

}


}
