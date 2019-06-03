import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { itemsPerPage, menuItems, currentTypeData } from 'src/assets/config';
import * as _ from 'lodash';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  private title = 'Comments';
  private postdata: {};
  public items: [];
  private id: number;
  private query: string;
  private linkFind = _.find(menuItems, { name: this.title });
  private linkPosts = this.linkFind ? this.linkFind.data : currentTypeData;
  public p = 1;
  public iPerPage: number;

  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.iPerPage = itemsPerPage;
    this.messageService.changeMessage('List Of ' + this.items);
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getPost(this.id);
    }
    this.fetchComments(this.id);
  }

  private getPost(id: number) {
    this.api.getDataHttp(`posts/${id}`).subscribe(
      data => {
        this.postdata = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  fetchComments(id: number) {
    if (!id) {
      this.query = this.linkPosts;
    } else {
      this.query = `${this.linkPosts}/?postId=${id}`;
    }

    this.api.getDataHttp(this.query).subscribe(
      data => {
        this.items = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
