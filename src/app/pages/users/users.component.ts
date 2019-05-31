import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SimpledataService } from 'src/app/services/simpledata.service';
import { ActivatedRoute } from '@angular/router';
import { PagerService } from 'src/app/services/pager.service';
import { itemsPerPage, menuItems, currentTypeData } from 'src/assets/config';
import * as _ from 'lodash';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  constructor(
    private api: ApiService,
    private data: SimpledataService,
    private route: ActivatedRoute,
    private pagerService: PagerService
  ) {}
  title = 'Users';
  users;
  userdata: {};
  id: number;
  query: string;
  private sub: any;
  linkFind = _.find(menuItems, { name: this.title });
  link = this.linkFind ? this.linkFind.data : currentTypeData;
  pager: any = {};
  pagedItems: any[];

  ngOnInit() {
    this.data.changeMessage('List Of ' + this.title);
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
    });
    if (this.id) {
      this.getUser(this.id);
    }
    this.fetchUsers(this.id);
  }

  getUser(id) {
    this.api.getDataHttp('users/' + id).subscribe(
      data => {
        this.userdata = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  fetchUsers(id?) {
    if (!id) {
      this.query = this.link;
    } else {
      this.query = this.link + '/?id=' + id;
    }

    this.api.getDataHttp(this.query).subscribe(
      data => {
        this.users = data;
        this.setPage(1);
      },
      err => {
        console.log(err);
      }
    );
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(
      this.users.length,
      page,
      itemsPerPage
    );

    // get current page of items
    this.pagedItems = this.users.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
