import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { PagerService } from 'src/app/services/pager.service';
import { itemsPerPage, menuItems, currentTypeData } from 'src/assets/config';
import * as _ from 'lodash';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private pagerService: PagerService
  ) {}
  private title = 'Posts';
  private posts;
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
    this.fetchPosts(this.id);
  }

  getUser(id) {
    this.api.getDataHttp('users/' + id).subscribe(
      userd => {
        this.userdata = userd;
      },
      err => {
        console.log(err);
      }
    );
  }

  fetchPosts(id?) {
    if (!id) {
      this.query = this.link;
    } else {
      this.query = this.link + '/?userId=' + id;
    }

    this.api.getDataHttp(this.query).subscribe(
      data => {
        this.posts = data;
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
      this.posts.length,
      page,
      itemsPerPage
    );

    // get current page of items
    this.pagedItems = this.posts.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
