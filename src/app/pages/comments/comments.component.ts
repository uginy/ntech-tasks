import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SimpledataService } from 'src/app/services/simpledata.service';
import { ActivatedRoute } from '@angular/router';
import { PagerService } from 'src/app/services/pager.service';
import { itemsPerPage, menuItems, currentTypeData } from 'src/assets/config';
import * as _ from 'lodash';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
  private posts;
  private postdata: {};
  private userdata: {};
  private title = 'Posts';
  private comments = 'Comments';
  private id: number;
  private query: string;
  private sub: any;
  private linkFind = _.find(menuItems, { name: this.comments });
  private linkPosts = this.linkFind ? this.linkFind.data : currentTypeData;
  private pager: any = {};
  private pagedItems;

  constructor(
    private api: ApiService,
    private data: SimpledataService,
    private route: ActivatedRoute,
    private pagerService: PagerService
  ) {}

  ngOnInit() {
    this.data.changeMessage('List Of ' + this.comments);
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
    });
    if (this.id) {
      // this.getUser(this.id);
      this.getPost(this.id);
    }
    this.fetchComments(this.id);
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

  getPost(id) {
    this.api.getDataHttp('posts/' + id).subscribe(
      data => {
        this.postdata = data;
        // console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  fetchComments(id?) {
    if (!id) {
      this.query = this.linkPosts;
    } else {
      this.query = this.linkPosts + '/?postId=' + id;
    }

    this.api.getDataHttp(this.query).subscribe(
      data => {
        this.comments = data;
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
      this.comments.length,
      page,
      itemsPerPage
    );

    // get current page of items
    this.pagedItems = this.comments.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
