import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'src/app/services/message.service';
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
    private messageService: MessageService,
    private route: ActivatedRoute,
    private pagerService: PagerService
  ) {}
  private title = 'Users';
  private users;
  private userdata: {};
  private id: number;
  private query: string;
  private sub: any;
  private linkFind = _.find(menuItems, { name: this.title });
  private link = this.linkFind ? this.linkFind.data : currentTypeData;
  public pager: any = {};
  public pagedItems: any[];

  ngOnInit() {
    this.messageService.changeMessage('List Of ' + this.title);
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
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
