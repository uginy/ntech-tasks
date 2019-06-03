import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { itemsPerPage, menuItems, currentTypeData } from 'src/assets/config';
import * as _ from 'lodash';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}
  private title = 'Posts';
  private items: [];
  private userdata: {};
  private id: number;
  private query: string;
  private linkFind = _.find(menuItems, { name: this.title });
  private link = this.linkFind ? this.linkFind.data : currentTypeData;
  public p = 1;
  public iPerPage: number;

  ngOnInit() {
    this.iPerPage = itemsPerPage;
    this.messageService.changeMessage('List Of ' + this.title);
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getUser(this.id);
    }
    this.fetchPosts(this.id);
  }

  getUser(id: number) {
    this.api.getDataHttp(`users/${id}`).subscribe(
      userd => {
        this.userdata = userd;
      },
      err => {
        console.log(err);
      }
    );
  }

  fetchPosts(id: number) {
    if (!id) {
      this.query = this.link;
    } else {
      this.query = `${this.link}/?userId=${id}`;
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
